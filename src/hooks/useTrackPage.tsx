import { Outlet } from "react-router-dom";
import { useLocationChange } from "./useLocation";

declare global {
    interface Window { _paq: any; }
}

var _paq = window._paq = window._paq || [];

export const useTrackPage = () => {
    useLocationChange((location) => {
        console.log("Matomo tracking page called", document.referrer, window.location.href)
        _paq.push(['setReferrerUrl', document.referrer]);
        _paq.push(['setCustomUrl', window.location.href]);
        //_paq.push(['setDocumentTitle', 'My New Title']);

        _paq.push(['deleteCustomVariables', 'page']);
        _paq.push(['trackPageView']);

        // make Matomo aware of newly added content
        // var content = document.getElementById('content');
        // _paq.push(['MediaAnalytics::scanForMedia', content]);
        // _paq.push(['FormAnalytics::scanForForms', content]);
        // _paq.push(['trackContentImpressionsWithinNode', content]);
        _paq.push(['enableLinkTracking']);
    })
}

export const TrackPage = () => {
    useTrackPage()
    return <Outlet />;
}