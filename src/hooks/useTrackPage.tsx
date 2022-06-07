import { useLocationChange } from "./useLocation";

declare global {
    interface Window { _paq: any; }
}

export const useTrackPage = () => {
    useLocationChange((location) => {
        let _paq = window._paq = window._paq || [];
        console.log("Matomo tracking page called", {referrer: document.referrer, href: window.location.href})
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
