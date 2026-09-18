/**
 * A working set of emoji rather than the whole Unicode table: the ones
 * people actually reach for in a training conversation, with the words
 * they search by. Kept as compact strings so the module stays small, and
 * the picker imports it lazily so a thread that never opens the picker
 * never pays for it.
 */
export interface EmojiGroup {
  name: string
  emoji: { char: string; keywords: string[] }[]
}

const groups: [string, string][] = [
  ["Smileys", "😀 grin smile happy|😃 smile happy|😄 laugh happy|😁 beam grin|😆 laugh squint|😅 sweat laugh|🤣 rofl laughing|😂 joy tears laugh|🙂 slight smile|🙃 upside down silly|😉 wink|😊 blush smile|😇 halo innocent|🥰 love hearts|😍 heart eyes love|😘 kiss|😗 kiss|😚 kiss|🤗 hug|🤔 think hmm|🤨 eyebrow doubt|😐 neutral|😑 expressionless|😶 no mouth quiet|🙄 eye roll|😏 smirk|😴 sleep tired|😪 sleepy|🤤 drool|😵 dizzy|🤯 mind blown|🥳 party celebrate|😎 cool sunglasses|🤓 nerd|🧐 monocle|😕 confused|😟 worried|🙁 frown|😮 surprise wow|😯 hushed|😢 cry sad|😭 sob cry|😤 triumph steam|😠 angry|😡 rage angry|🤬 swear angry|😱 scream fear|😨 fearful|😰 anxious|😥 sad relieved|🤒 sick ill|🤕 hurt injury|🤢 nauseated sick|🥵 hot sweat|🥶 cold freezing|😬 grimace|🤐 zipper quiet|🤫 shh quiet|🤭 oops giggle"],
  ["Gestures", "👍 thumbs up yes good|👎 thumbs down no bad|👌 ok perfect|✌️ peace victory|🤞 fingers crossed luck|🤟 love you|🤘 rock horns|🤙 call me shaka|👏 clap applause|🙌 raise hands praise|👐 open hands|🤝 handshake deal|🙏 please thanks pray|💪 muscle strong flex|✊ fist power|👊 punch fist|🫶 heart hands|👋 wave hello bye|🖐️ hand stop|✋ stop high five|🫡 salute|🤲 palms up|☝️ point up|👉 point right|👈 point left|👇 point down|🖕 rude"],
  ["People", "🧗 climb climbing|🧗‍♀️ climber woman|🧗‍♂️ climber man|🏃 run running|🏃‍♀️ runner woman|🏃‍♂️ runner man|🚶 walk|🧘 yoga meditate|🤸 cartwheel gymnastics|🏋️ lift weights gym|🏋️‍♀️ lifter woman|🏋️‍♂️ lifter man|🤾 handball throw|🚴 cycle bike|🏊 swim|⛹️ basketball dribble|🤺 fence|🏄 surf|🧑‍🏫 coach teacher|👨‍⚕️ doctor|👩‍⚕️ doctor|👶 baby|🧓 elder|👀 eyes look|🧠 brain"],
  ["Training", "🏔️ mountain alps|⛰️ mountain|🧱 wall bricks|🪨 rock stone boulder|🥾 boot hiking|🩹 plaster injury|🦵 leg|🦶 foot|🫀 heart organ cardio|⏱️ stopwatch timer|⏳ hourglass time|📈 chart progress up|📉 chart down|📊 chart bars|🎯 target goal|🏆 trophy win|🥇 gold first|🥈 silver second|🥉 bronze third|🏅 medal|🎽 vest sport|🥊 boxing gloves|🤼 wrestle|🛹 skateboard|🎿 ski|🏂 snowboard|⚽ football soccer|🏀 basketball|🏐 volleyball|🎾 tennis|🏓 table tennis|🥏 frisbee"],
  ["Nature", "🔥 fire hot lit|✨ sparkles shine|⭐ star|🌟 glowing star|⚡ lightning fast|☀️ sun sunny|🌤️ sun cloud|☁️ cloud|🌧️ rain|⛈️ storm|❄️ snow cold|🌈 rainbow|🌊 wave sea|🌱 seedling grow|🌳 tree|🍀 clover luck|🌸 blossom|💐 bouquet|🐕 dog|🐈 cat|🦁 lion strong|🐐 goat|🦅 eagle|🐢 turtle slow|🦋 butterfly"],
  ["Food", "🍎 apple|🍌 banana|🍓 strawberry|🍇 grapes|🥑 avocado|🥦 broccoli|🥕 carrot|🍞 bread|🥚 egg|🍗 chicken meat|🥩 steak meat protein|🐟 fish|🥗 salad|🍚 rice|🍝 pasta|🍕 pizza|🍔 burger|🌮 taco|🧀 cheese|🥤 drink shake|💧 water drop hydrate|☕ coffee|🍵 tea|🧊 ice|🍫 chocolate|🍪 cookie|🎂 cake birthday|🍺 beer|🥂 cheers toast"],
  ["Objects", "📱 phone|💻 laptop|⌚ watch|📷 camera photo|🎥 video camera|🎧 headphones music|🎵 music note|📝 note write|📋 clipboard plan|📅 calendar date|📌 pin|📎 clip|🔑 key|🔒 lock|💡 idea bulb|🔔 bell notify|📣 megaphone shout|💬 speech message|💭 thought|✉️ mail|📦 package|🧾 receipt|💰 money|💳 card payment|🎁 gift|🛠️ tools fix|🧴 lotion|🧼 soap|🛏️ bed rest|🚿 shower"],
  ["Symbols", "❤️ heart love red|🧡 orange heart|💛 yellow heart|💚 green heart|💙 blue heart|💜 purple heart|🖤 black heart|🤍 white heart|💔 broken heart|💯 hundred perfect|✅ check done yes|☑️ checkbox|❌ cross no wrong|⚠️ warning careful|❓ question|❗ exclamation|➕ plus add|➖ minus|🔁 repeat loop|🔄 refresh|⏩ fast forward|⏸️ pause|▶️ play|⏹️ stop|🆗 ok|🆕 new|🔝 top up|♻️ recycle|🎉 party tada celebrate|🎊 confetti"],
]

export const emojiGroups: EmojiGroup[] = groups.map(([name, entries]) => ({
  name,
  emoji: entries.split("|").map((entry) => {
    const [char, ...keywords] = entry.split(" ")
    return { char: char!, keywords }
  }),
}))

export function searchEmoji(query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return null
  const matches: { char: string; keywords: string[] }[] = []
  for (const group of emojiGroups) {
    for (const entry of group.emoji) {
      if (entry.keywords.some((keyword) => keyword.startsWith(needle))) matches.push(entry)
    }
  }
  return matches
}
