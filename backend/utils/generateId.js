const supabase = require("../config/supabaseClient");

// Asks Postgres for the next member_id via the icmt_member_id_seq sequence.
// Safe under concurrency — the DB guarantees no two callers ever get the
// same value, unlike computing "max + 1" in JavaScript.
async function generateNextMemberId() {
  const { data, error } = await supabase.rpc("next_member_id");
  if (error) throw error;
  return data; // e.g. "ICMT381"
}

module.exports = { generateNextMemberId };