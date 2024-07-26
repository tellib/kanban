import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl) throw new Error('NEXT_PUBLIC_SUPABASE_URL not defined');
if (!supabaseKey) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY not defined');

export const supabase = createClient(supabaseUrl, supabaseKey);

async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session: ', error.message);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('Unexpected error getting session: ', error);
    return null;
  }
}

async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error('Error signing up: ', error.message);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('Unexpected error signing up: ', error);
    return null;
  }
}

async function signInWithPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error('Error signing in: ', error.message);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('Unexpected error signing in: ', error);
    return null;
  }
}

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out: ', error.message);
    }
  } catch (error) {
    console.error('Unexpected error signing out: ', error);
  }
}

export { getSession, signUp, signInWithPassword, signOut };
