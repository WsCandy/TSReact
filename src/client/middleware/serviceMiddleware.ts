import { Dispatch, Middleware } from "redux";
import AppState from "_model/redux/AppState";

const hasExpired = (date: Date): boolean => {
    const now = new Date();
    const hour = 1000 * 60 * 60;

    return date.getTime() > now.getTime() + hour * 24;
};

const processDocument = (state: AppState) => {
    const script = document.getElementById("state-script");

    if (script) {
        script.innerHTML = `window.INITIAL_STATE = ${JSON.stringify(state)}`;
    }

    return document;
};

const serviceMiddleware: Middleware = m => (next: Dispatch) => action => {
    if (
        action.type === "@@router/LOCATION_CHANGE" &&
        typeof window !== "undefined"
    ) {
        window.caches.open("pages").then(cache =>
            cache
                .match(window.location.href)
                .then(res => {
                    if (typeof res === "undefined") {
                        throw new Error("cache me!");
                    }

                    const d = res.headers.get("date");

                    const date = !d ? new Date() : new Date(d);

                    if (!d || hasExpired(date)) {
                        throw new Error("cache me!");
                    }
                })
                .catch(() =>
                    cache.add(
                        new Request(window.location.href, {
                            headers: {
                                type: "page"
                            }
                        })
                    )
                )
                .catch(() => {
                    setTimeout(
                        () =>
                            cache.put(
                                window.location.href,
                                new Response(
                                    processDocument(
                                        m.getState()
                                    ).documentElement.outerHTML,
                                    {
                                        headers: {
                                            "Content-Type":
                                                "text/html; charset=utf-8",
                                            type: "page"
                                        }
                                    }
                                )
                            ),
                        1000
                    );
                })
        );
    }

    return next(action);
};

export default serviceMiddleware;
