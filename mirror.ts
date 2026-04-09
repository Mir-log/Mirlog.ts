const mirror = (() => {
    function utcnow(): string {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
    }

    enum Mode {
        clearstrwithoutanother = 0,
        timestrclear = 1,
        nocolor = 2,
        coloredstr = 3
    }

    enum Lv {
        Info = 0,
        Access = 1,
        Warn = 2,
        Error = 3,
        Panic = 4
    }

    enum Colors {
        green = 0,
        blue = 1,
        red = 2,
        white = 3,
        yellow = 4,
        Auto = 5
    }

    function MatchLv(lv: Lv): string {
        switch (lv) {
            case Lv.Info:   return "[INFO]";
            case Lv.Access: return "[ACCESS]";
            case Lv.Warn:   return "[WARN]";
            case Lv.Error:  return "[ERROR]";
            case Lv.Panic:  return "[PANIC]";
            default:        return "[UNKNOWN]";
        }
    }

    function getCssColor(col: Colors): string {
        switch (col) {
            case Colors.green:  return "green";
            case Colors.blue:   return "blue";
            case Colors.red:    return "red";
            case Colors.white:  return "white";
            case Colors.yellow: return "yellow";
            default:            return "white";
        }
    }

    function autoColorByLevel(lv: Lv): Colors {
        switch (lv) {
            case Lv.Info:   return Colors.white;
            case Lv.Access: return Colors.green;
            case Lv.Warn:   return Colors.yellow;
            case Lv.Error:
            case Lv.Panic:  return Colors.red;
            default:        return Colors.white;
        }
    }

    function mirprint(lv: Lv, msg: string, mode: Mode, col: Colors = Colors.Auto): void {
        switch (mode) {
            case Mode.clearstrwithoutanother:
                console.log(msg);
                break;

            case Mode.timestrclear:
                console.log(utcnow() + ' ' + msg);
                break;

            case Mode.nocolor:
                console.log(utcnow() + ' ' + MatchLv(lv) + ' ' + msg);
                break;

            case Mode.coloredstr: {
                let finalColor = col;
                if (finalColor === Colors.Auto) {
                    finalColor = autoColorByLevel(lv);
                }
                const cssColor = getCssColor(finalColor);
                const message = utcnow() + ' ' + MatchLv(lv) + ' ' + msg;
                console.log(`%c${message}`, `color: ${cssColor};`);
                break;
            }

            default:
                console.log(msg);
                break;
        }
    }

    return {
        utcnow,
        Mode,
        Lv,
        Colors,
        MatchLv,
        mirprint
    };
})();
