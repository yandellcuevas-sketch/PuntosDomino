const SUPABASE_URL = 'https://zfrthbupraufxhgbmgmh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_VcuOeLUk127F4UvAchf1Xw_s_xVA-VR';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let currentUser = null;

// ─── Autenticación (Modo Invitado por defecto) ─────────────────────
async function initSupabaseAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        currentUser = session.user;
    } else {
        // Sign in anonymously
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
            console.error('Error signing in anonymously', error);
        } else {
            currentUser = data.user;
        }
    }
}

// Inicializar auth al cargar
initSupabaseAuth();

// ─── Funciones de Persistencia Online (Supabase) ───────────────────
async function fb_saveGame(gameData) {
    if (!gameData || !gameData.id || !currentUser) return;
    
    try {
        const { error } = await supabase
            .from('games')
            .upsert({ 
                id: gameData.id, 
                user_id: currentUser.id,
                data: gameData,
                updated_at: new Date().toISOString()
            });
            
        if (error) console.error('Error saving game to Supabase:', error);
    } catch (e) {
        console.error('Network error saving game:', e);
    }
}

async function fb_saveHistory(historyData) {
    if (!historyData || !currentUser) return;
    
    try {
        const { error } = await supabase
            .from('profiles')
            .upsert({ 
                id: currentUser.id,
                history: historyData,
                updated_at: new Date().toISOString()
            });
            
        if (error) console.error('Error saving history to Supabase:', error);
    } catch (e) {
        console.error('Network error saving history:', e);
    }
}

let currentGameSubscription = null;

function fb_setRoomCode(code) {
    if (currentGameSubscription) {
        supabase.removeChannel(currentGameSubscription);
    }
    
    currentGameSubscription = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'games', filter: `code=eq.${code}` },
        (payload) => {
          if (payload.new && payload.new.data && typeof window.fb_onGameChangeCallback === 'function') {
              window.fb_onGameChangeCallback(payload.new.data);
          }
        }
      )
      .subscribe();
}

function fb_onGameChange(callback) {
    window.fb_onGameChangeCallback = callback;
}

