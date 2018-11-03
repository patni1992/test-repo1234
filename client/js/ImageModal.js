class ImageModal {
    constructor(mountingElement, images) {
        this.build(mountingElement, images, false)
    }

    build(mountingElement, images, clean = true ){
        if(clean) {
            document.querySelector('[data-modal]').remove();
        }

        this.modal = insertHTML(mountingElement, images)
        this.images = document.querySelectorAll(".carosouel__img");
        this.activeImage = document.querySelector('[data-main-img]');
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.setActiveImage = this.setActiveImage.bind(this);
        initEvents(this.hide, this.images, this.setActiveImage);
    }

    setActiveImage(img) {
        this.activeImage.src = img.src;
        this.images.forEach(image => image.classList.remove("carosouel__selected"))
        img.classList.add("carosouel__selected")
    }

    show() {
        this.modal.classList.add("is-active");
    }

    hide() {
        this.modal.classList.remove("is-active")
    }
    
}

function insertHTML(mountingElement, images) {
    const activeImage = images[0];
    const html = ` <div data-modal class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <section class="modal-card-body">
            <div class="columns is-multiline is-gapless">
                <div class="is-12">
                    <img data-main-img class="carosouel__main-img " src="${activeImage}"
                        alt="">
                </div>
                ${images.map(img => (`
                <div class="column is-3">
                    <img data-index="1" class="carosouel__img" src="${img}" alt="">
                </div>
                `
            )).join(' ')}
            </div>
        </section>
    </div>
</div>`

mountingElement.insertAdjacentHTML( 'beforeend', html );

return document.querySelector('[data-modal]');

}

function initEvents(hideModal, images, setActiveImage) {
    document.querySelector(".modal-background").addEventListener("click", hideModal);
    document.querySelectorAll(".carosouel__img").forEach(image => image.addEventListener("click", (e) => setActiveImage(e.currentTarget)));
}

export default ImageModal;