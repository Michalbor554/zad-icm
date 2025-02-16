const ProductCarousel = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [productsPerPage, setProductsPerPage] = React.useState(3);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setProductsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setProductsPerPage(2);
      } else {
        setProductsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const products = [
    {
      id: 1,
      title: "Behringer X32 Compact",
      description: "Cyfrowy mikser Behringer X32 Compact zawiera wszystko, czego potrzebujesz do łatwego miksowania i nagrywania występów na żywo.",
      image: "img/produkty/behringer.jpg"
    },
    {
      id: 2,
      title: "Millenium MPS-850",
      description: "Perkusja elektroniczna Millenium MPS-850 to bogato wyposażony elektroniczny zestaw perkusyjny zawierający sześć padów z naciągami siateczkowymi.",
      image: "img/produkty/milenium.jpg"
    },
    {
      id: 3,
      title: "Rode NT1 Signature",
      description: "Studyjny mikrofon pojemnościowy o wszechstronnym zastosowaniu, charakteryzujący się ciepłym, aksamitnym brzmieniem.",
      image: "img/produkty/Rode.png"
    },
    {
      id: 4,
      title: "Steven Slate Audio VSX",
      description: "Profesjonalne słuchawki i wirtualny system odsłuchowy w podstawowej wersji modelujący najbardziej znane pomieszczenia studyjne.",
      image: "img/produkty/słuchawki.jpg"
    }
  ];

  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return React.createElement("div", { className: "w-full bg-[#d4d3bd] p-4 md:p-10" },
    React.createElement("h2", { className: "text-3xl md:text-4xl font-extrabold text-black text-center mb-6 md:mb-10" }, "Bestseller"),
    React.createElement("div", { className: "relative" },
      React.createElement("div", { className: "flex justify-center items-center gap-4 md:gap-16" },
        currentProducts.map(product =>
          React.createElement("a", {
            href: "_blank",
            target: "_blank",
            key: product.id,
            className: "text-white no-underline"
          },
            React.createElement("div", { className: "relative overflow-hidden cursor-pointer group" },
              React.createElement("img", {
                src: product.image,
                alt: product.title,
                className: "w-48 md:w-60 h-56 md:h-72 object-cover"
              }),
              React.createElement("div", { className: "absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white transition-all duration-300 h-12 group-hover:h-auto" },
                React.createElement("h3", { className: "py-2 md:py-4 px-2 md:px-4 text-base md:text-lg font-medium text-center" },
                  product.title
                ),
                React.createElement("p", { className: "px-2 md:px-4 pb-2 md:pb-4 text-xs md:text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300" },
                  product.description
                )
              )
            )
          )
        )
      ),
      React.createElement("button", {
        onClick: prevPage,
        className: "absolute left-1 md:left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-1 md:p-2 rounded-full text-white hover:bg-opacity-75 transition-all"
      },
        React.createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        },
          React.createElement("polyline", { points: "15 18 9 12 15 6" })
        )
      ),
      React.createElement("button", {
        onClick: nextPage,
        className: "absolute right-1 md:right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-1 md:p-2 rounded-full text-white hover:bg-opacity-75 transition-all"
      },
        React.createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        },
          React.createElement("polyline", { points: "9 18 15 12 9 6" })
        )
      ),
      React.createElement("div", { className: "flex justify-center mt-4 md:mt-6 gap-2" },
        Array.from({ length: totalPages }).map((_, index) =>
          React.createElement("button", {
            key: index,
            onClick: () => setCurrentPage(index),
            className: `w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              currentPage === index ? 'bg-black' : 'bg-gray-400'
            }`
          })
        )
      )
    )
  );
};

// Montowanie komponentu
const root = ReactDOM.createRoot(document.getElementById('product-carousel-root'));
root.render(React.createElement(ProductCarousel));