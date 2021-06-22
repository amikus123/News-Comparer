export const URLS = [
  {
    url: "https://www.fronda.pl",
    popupSelector:
      "#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay.qc-cmp2-footer-scrolled > div > button.css-1n5vbtz",

    contentSelectors: ["* h1", "* h2", "* h4"],
    title: "Fronda",
    imageName:"Fronda"


  },

  {
    url: "https://krytykapolityczna.pl",
    popupSelector: "",

    contentSelectors: ["* h2"],
    title: "Krytyka Polityczna",
    imageName:"Krytyka_Polityczna"

  },

  {
    url: "https://www.tvp.info",
    popupSelector:
      "#ip > div > div > div > div.tvp-covl__t > div.tvp-covl__b > div.tvp-covl__ab",

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
    title: "TVP info",
    imageName:"TVP_info"
  },
];
