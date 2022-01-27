    function modalBoxTemplate(e, remove) {
        let modal = $("[modal-box-container]");
        let ModalALert = ` <div class="app-modal overlay d-non" modal-box-container>${e}</div>`;

        if (e !== "") {
            modal.length > 0 ? modal.remove() : "";
            $(body).append(ModalALert);
        }

        if (remove === true) {
            modal.fadeOut(500)
            modal.children().remove();
        }
    }

    function modal({
        title,
        type,
        text,
        className,
        isLoading,
        imgUrl
    }, fallback) {
        let template;

        if (isLoading) {
            template = `
             <div class="modal-box loader" modal-box="loader">
                <div class="loader-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>`;
            return modalBoxTemplate(template)
        } else if (!isLoading) {
            modalBoxTemplate("", true);
        }

        if (type === "error") {
            $("[app-modal='inline-modal']").length > 0 ? $("[app-modal='inline-modal']").remove() : "";

            template = `<div class="app-sm-modal" app-modal="inline-modal" style="display:flex">
                                <span class="text">${text}</span>
                                <button class="btn" app-event="close-inline-modal">X</button>
                            </div>`;

            body.append(template);

            setTimeout(() => {
                $("[app-modal='inline-modal']").fadeOut();
            }, 5000);

        } else {
            let img = imgUrl !== undefined ? `<img src='${imgUrl}' alt='${text}' />` : "";

            template = ` <div class="modal-box box" modal-box="box">
                                         ${img !== "" ? img : ""}
                                    <h3 class="modal-title success" app-modal-title>
                                    ${title}
                                    </h3>

                                    <p class="modal-text" app-modal-text>
                                        ${text}
                                    </p>

                                    <button class="btn btn-blue btn-${className.toLowerCase()}" type="button" app-event="cl-modal">Ok</button>
                            </div>`;
            modalBoxTemplate(template);
        }
        return typeof fallback === "function" ? fallback() : "";

    }
    $("body").on("click", "[app-event='cl-modal']", () => {
        modalBoxTemplate("", true);
    })