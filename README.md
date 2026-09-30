# Cookie Bot
**Cookie Bot** is an add-on you can load  into Cookie Clicker, that will do an automatic playthrough for Cookie Clicker. It does not cheat (but see below) and it is not strictly speaking a third-party tool in the sense of cookie clicker, but it allows you to get all achievements needed for a complete playthrough.

This is the maintained [`lbr88-labs/CookieBot`](https://github.com/lbr88-labs/CookieBot) fork, originally created by [Prinz Stani](https://github.com/prinzstani). Current issues and contributions for this fork belong in its [GitHub repository](https://github.com/lbr88-labs/CookieBot). This documentation update does not announce a new release.

The tool is designed to mimic a human player, and it avoids being super-human in terms of clicking speed and possible moves. This includes also not playing at night, i.e. from 23:00 until 07:00. For the night mode, if possible, the golden switch is used together with fitting spirits in order to maximize output.

In most cases, the bot uses the same interface as a human player. Some achievements take very long time or are even impossible with the regular game interface. In these cases, the bot accesses the internal game parameters and cheats the game. Cheats are activities that are not possible from the user interface.

Cookie Bot will start wherever you are in your game and continue to a complete playthrough.

## Maintained fork status

The fork's browser Pages base is [`https://lbr88-labs.github.io/CookieBot/`](https://lbr88-labs.github.io/CookieBot/). Upstream release history remains attributed to the original project; it is not a new fork release announcement.

## What it does

Cookie Bot plays through the complete game of Cookie Clicker. This will take about two months, depending a lot on randomness in the game itself. See also the [FAQ](FAQ.md) for more details. It indicates its current steps when you hover over the version text of it (bottom left of screen).

## Limitations

It is not claimed that Cookie Bot uses the best strategy possible. The idea is to use one strategy that works in all cases. That being said, please feel free to [suggest improvements in the maintained fork](https://github.com/lbr88-labs/CookieBot).

Cookie Bot does not combine well with imports. If you want to run it on another game, first reload cookie clicker and get rid of the bot, then import, and finally reload the bot.

# Usage

## Legacy stable bookmarklet

The old stable bookmarklet is a legacy path. It loads upstream's `cookieAutoPlay.js` loader and remains tied to its historical RawGit release-file path; it is not a maintained fork download and is not redirected to the maintained fork beta. To use this legacy path, save this code as a bookmark URL and click it while Cookie Clicker is open.

```javascript
javascript: (function () {
	Game.LoadMod('https://prinzstani.github.io/CookieBot/cookieAutoPlay.js');
}());
```

## Beta browser bookmarklet

The beta browser bookmarklet loads the fork's beta monolith at `https://lbr88-labs.github.io/CookieBot/cookieAutoPlayBeta.js`. Save this code as a bookmark URL and click it while Cookie Clicker is open:

```javascript
javascript:(function () {
  Game.LoadMod('https://lbr88-labs.github.io/CookieBot/cookieAutoPlayBeta.js');
}());
```

## Userscript

The repository contains a separate root beta [`CookieBot.user.js`](CookieBot.user.js), courtesy of **[SearchAndDestroy](https://github.com/SearchAndDestroy)**. Its `@updateURL`, `@downloadURL`, and `Game.LoadMod` now use the canonical `https://lbr88-labs.github.io/CookieBot/` Pages URLs. This URL correction has no browser runtime or save validation, and the root beta userscript has no stable designation. Existing users should manually install or replace it from [`https://lbr88-labs.github.io/CookieBot/CookieBot.user.js`](https://lbr88-labs.github.io/CookieBot/CookieBot.user.js): the old `lbr88.github.io` `@updateURL` returns 404, so automatic updates from that host can fail.

The separate [experimental TypeScript `dist/CookieBot.user.js`](https://lbr88-labs.github.io/CookieBot/dist/CookieBot.user.js) is version `2.052-130` and loads the current [`dist/cookieAutoPlayBeta-latest.js`](https://lbr88-labs.github.io/CookieBot/dist/cookieAutoPlayBeta-latest.js) bundle. Its metadata and payload URL use the canonical Pages URLs. It has no browser runtime or save validation and no stable designation. Existing users should manually install or replace it from [`https://lbr88-labs.github.io/CookieBot/dist/CookieBot.user.js`](https://lbr88-labs.github.io/CookieBot/dist/CookieBot.user.js): the old `lbr88.github.io` `@updateURL` returns 404, so automatic updates from that host can fail. Install only one supported channel at a time.

## Steam

For the beta Steam mod, download [`CookieBotBeta4Steam.zip`](CookieBotBeta4Steam.zip) and extract it into `{Install Folder}\resources\app\mods\local`. The archive already contains the `CookieBot Beta` folder with exactly `info.txt` and `main.js`; do not add another enclosing folder. Its `main.js` loads `https://lbr88-labs.github.io/CookieBot/cookieAutoPlayBeta.js`, the same beta monolith used by the browser bookmarklet. In Cookie Clicker, open Options → Mods and enable CookieBot Beta; its shipped `info.txt` sets `Disabled: 1`. Reload the game if prompted. The beta Steam files are courtesy of **[thelmexx](https://github.com/thelmexx)**.

The shipped `CookieBot Beta/info.txt` retains historical upstream metadata: `ModVersion` 2.030, `GameVersion` 2.031, date `13/09/2021`, `Disabled` 1, and `AllowSteamAchievs` 1. These old values are reproduced from the file; they are not a claim of current game compatibility or a new release, and the metadata retains the original author attribution.

[`CookieBot4Steam.zip`](CookieBot4Steam.zip) is a legacy stable package and remains unchanged. It loads upstream's stable `cookieAutoPlay.js`, which uses the historical RawGit release-file path. It is not the maintained fork delivery and is not redirected to the maintained fork beta.

## Saves and configuration

Before trying another channel, export a backup of the intended game save and use a disposable save or profile for initial checks. Stop or disable the current channel and reload the game before switching. Keep the original export unchanged so you can re-import it if needed.

The legacy beta and experimental TypeScript channel use overlapping configuration paths (`autoplayConfig` and `CookieBot_Config`), and parity between their settings has not been established. Do not assume settings migrate correctly between channels. No save migration is provided or claimed here.

# Bugs and suggestions

Any bug or suggestion about this fork should be **created as an issue** [in `lbr88-labs/CookieBot`](https://github.com/lbr88-labs/CookieBot/issues) for easier tracking. This allows its status to be followed.

All suggestions are welcome, even the smallest ones.

Before submitting a bug report, please reload the bot, as it is continuously improved. Maybe the bug is already fixed. When you do report a bug, please make sure to include the following information.
* Version number of Cookie Clicker and of Cookie Bot, also indicating whether you use the beta or not.
* Description of the Problem
* Reproduce on a disposable save or profile. Do not post a personal save publicly; export a backup before testing and re-import it only after stopping the bot.

# Contributors
* **[Prinz Stani](https://github.com/prinzstani)**: Original author and upstream maintainer
* **[SearchAndDestroy](https://github.com/SearchAndDestroy)**: Tampermonkey script
* **[AlexFolland](https://github.com/AlexFolland)**: Options and small fixes
* **[corvidian](https://github.com/corvidian)**: Elder handling and optimization
* **[troycomi](https://github.com/troycomi)**: Savings, cookie monster integration
* See also the [list of commit contributors](https://github.com/prinzstani/CookieBot/graphs/contributors)

Contributions to the maintained fork can be proposed through its [issues and pull requests](https://github.com/lbr88-labs/CookieBot).
