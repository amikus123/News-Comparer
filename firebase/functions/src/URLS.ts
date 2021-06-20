export const URLS = [
  {
    url: "https://www.fronda.pl",
    popupSelector:
      "#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-1n5vbtz",
    validateElements: (elementClasses: string[], parentClasses: string[]) => {
      if (true) {
        return true;
      }
      return false;
    },
    contentSelectors: ["* h1", "* h2", "* h4"],
  },

  {
    url: "https://krytykapolityczna.pl",
    popupSelector: "",
    validateElements: (elementClasses: string[], parentClasses: string[]) => {
      if (true) {
        return true;
      }
      return false;
    },
    contentSelectors: ["* h2"],
  },

  {
    url: "https://www.tvp.info",
    popupSelector:
      "#ip > div > div > div > div.tvp-covl__t > div.tvp-covl__b > div.tvp-covl__ab",
    validateElements: (elementClasses: string[], parentClasses: string[]) => {
      if (true) {
        return true;
      }
      return false;
    },
    contentSelectors: [
      ".title",
      ".news__title",
      ".news__text",
      ".large-box__description--title",
      ".information-text",
      ".magazine__title",
      ".magazine__content--title",
      ".report__description",
      ".popular__description",
    ],
  },
];
