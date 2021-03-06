import consts from "consts/consts"

class BrowserHelpers{

    addEvent (object, type, callback) {

        if (object === null || typeof(object) === 'undefined') return;

        if (object.addEventListener)
            object.addEventListener(type, callback, false);
        else if (object.attachEvent)
            object.attachEvent("on" + type, callback);
        else
            object["on"+type] = callback;

    }

    timeDiff(previous) {

        const current = new Date().getTime();

        if (current < previous) return 'now';

        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) return Math.round(elapsed/1000 ) + 's';
        if (elapsed < msPerHour) return Math.round(elapsed/msPerMinute ) + 'm';
        if (elapsed < msPerDay ) return Math.round(elapsed/msPerHour ) + 'h';
        if (elapsed < msPerMonth) return Math.round(elapsed/msPerDay ) + 'd';
        if (elapsed < msPerYear) return Math.round(elapsed/msPerMonth ) + 'mo';

        return Math.round(elapsed/msPerYear  + 'y');
    }

    processRelativeLink(link){

        if (!link) return '';

        return link[0] === '/' ? consts.serverApi + link : link;
    }

    processLink(link, count = 30){

        link = link.replace('https://','').replace('http://','').replace('www.','');
        return link.length < count ? link : link.substr(0, count) + '...';

    }

    trimSlash(link){

        if (link && link[link.length-1 ] === '/') link = link.substr(0, link.length-1);
        if (link && link[ 0 ] === '/') link = link.substr(1);

        return link;

    }


}

export default new BrowserHelpers();