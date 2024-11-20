import {
  Stateful,
  button,
  div,
  footer,
  h1,
  h2,
  header,
  li,
  main,
  nav,
  p,
  route,
  section,
  ul,
} from "@marcomit/core";

class HomePage extends Stateful {
  #counter = 0;
  #activeTab = 0;
  #accordionOpen = false;

  #incrementCounter() {
    this.set(() => this.#counter++);
  }

  #toggleTab(tabIndex: number) {
    this.set(() => (this.#activeTab = tabIndex));
  }

  #toggleAccordion() {
    this.set(() => (this.#accordionOpen = !this.#accordionOpen));
  }

  async build() {
    return main(
      { class: "landing-page max-w-7xl mx-auto px-4 py-8" },
      // Header with navigation
      header(
        { class: "flex justify-between items-center py-4 bg-gray-900" },
        h1({ class: "text-2xl font-bold text-white" }, "Tee"),
        nav(
          { class: "space-x-6" },
          ul(
            { class: "flex space-x-4" },
            li(
              button(
                {
                  class: "text-gray-300 hover:text-white",
                  onclick: () => console.log("Docs clicked"),
                },
                "Docs"
              )
            ),
            li(
              button(
                {
                  class: "text-gray-300 hover:text-white",
                  onclick: () => console.log("About clicked"),
                },
                "About"
              )
            ),
            li(
              button(
                {
                  class: "text-gray-300 hover:text-white",
                  onclick: () => console.log("Libraries clicked"),
                },
                "Libraries"
              )
            )
          )
        )
      ),
      // Intro Section
      section(
        { class: "text-center py-16 bg-gray-800" },
        div(
          { class: "max-w-2xl mx-auto" },
          h1(
            { class: "text-4xl font-extrabold text-white mb-4" },
            "Build Fast. Scale Seamlessly."
          ),
          p(
            { class: "text-gray-400 mb-6" },
            "Tee is a modern, lightweight framework that empowers developers to create high-performance applications with ease."
          ),
          button(
            {
              class:
                "bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-600",
              onclick: () => console.log("Get Started clicked"),
            },
            "Get Started"
          )
        )
      ),
      // Features Section
      section(
        { class: "py-16 bg-gray-900 text-gray-300" },
        h2(
          { class: "text-2xl font-bold text-center mb-8 text-white" },
          "Features"
        ),
        div(
          { class: "flex flex-wrap justify-center gap-8" },
          div(
            { class: "bg-gray-800 p-6 rounded-md text-center w-72" },
            h2(
              { class: "text-xl font-semibold text-white mb-2" },
              "⚡ Lightweight"
            ),
            p(
              { class: "text-gray-400" },
              "Optimized for performance and scalability."
            )
          ),
          div(
            { class: "bg-gray-800 p-6 rounded-md text-center w-72" },
            h2(
              { class: "text-xl font-semibold text-white mb-2" },
              "💡 Intuitive"
            ),
            p(
              { class: "text-gray-400" },
              "Built with simplicity and developer experience in mind."
            )
          ),
          div(
            { class: "bg-gray-800 p-6 rounded-md text-center w-72" },
            h2({ class: "text-xl font-semibold text-white mb-2" }, "🌍 Modern"),
            p(
              { class: "text-gray-400" },
              "Designed for the needs of today's web applications."
            )
          )
        )
      ),
      // Showcase Section
      section(
        { class: "py-16 bg-gray-800 text-gray-300" },
        h2(
          { class: "text-2xl font-bold text-center mb-8 text-white" },
          "Showcases"
        ),
        div(
          { class: "space-y-8" },
          div(
            { class: "text-center" },
            h2(
              { class: "text-xl font-semibold text-white mb-2" },
              "Interactive Counter"
            ),
            p({ class: "text-gray-400 mb-4" }, `Count: ${this.#counter}`),
            button(
              {
                class:
                  "bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-600",
                onclick: () => this.#incrementCounter(),
              },
              "Increment Counter"
            )
          ),
          div(
            { class: "text-center" },
            h2(
              { class: "text-xl font-semibold text-white mb-2" },
              "Animated Tabs"
            ),
            div(
              { class: "space-x-4 mb-4" },
              button(
                {
                  class: `px-4 py-2 rounded-md ${
                    this.#activeTab === 0
                      ? "bg-gray-700 text-white"
                      : "bg-gray-600 text-gray-300"
                  }`,
                  onclick: () => this.#toggleTab(0),
                },
                "Tab 1"
              ),
              button(
                {
                  class: `px-4 py-2 rounded-md ${
                    this.#activeTab === 1
                      ? "bg-gray-700 text-white"
                      : "bg-gray-600 text-gray-300"
                  }`,
                  onclick: () => this.#toggleTab(1),
                },
                "Tab 2"
              )
            ),
            p(
              { class: "text-gray-400" },
              this.#activeTab === 0 ? "Content for Tab 1" : "Content for Tab 2"
            )
          ),
          div(
            { class: "text-center" },
            h2({ class: "text-xl font-semibold text-white mb-2" }, "Accordion"),
            button(
              {
                class:
                  "bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-600 mb-4",
                onclick: () => this.#toggleAccordion(),
              },
              this.#accordionOpen ? "Hide Details" : "Show Details"
            ),
            this.#accordionOpen
              ? p(
                  { class: "text-gray-400" },
                  "This is an example of an accordion, where content can be toggled."
                )
              : null
          )
        )
      ),
      // Footer Section
      footer(
        { class: "py-6 bg-gray-900 text-center text-gray-400" },
        p("© 2024 Tee Framework. Minimalism redefined.")
      )
    );
  }
}

route({
  "/": () => new HomePage(),
});

console.log("Tee Framework Landing Page Loaded!");
