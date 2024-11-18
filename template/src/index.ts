import {
  Stateful,
  main,
  header,
  h1,
  p,
  button,
  h2,
  div,
  section,
  footer,
  route,
  pre,
  code,
} from "@marcomit/core";

class HomePage extends Stateful {
  #counter = 0;

  #incrementCounter() {
    this.set(() => this.#counter++);
  }
  async build() {
    return main(
      { class: "home-page" },
      header(
        { class: "header" },
        h1("FrameworkX"),
        p("The modern framework for building blazing-fast web applications.")
      ),
      section(
        { class: "features" },
        div(
          { class: "feature" },
          h2("🚀 Fast & Lightweight"),
          p(
            "Harness the power of minimal JavaScript with a focus on performance."
          )
        ),
        div(
          { class: "feature" },
          h2("⚡ Reactive by Design"),
          p("Built with a reactive core for a seamless user experience.")
        ),
        div(
          { class: "feature" },
          h2("🎨 Intuitive Syntax"),
          p("Simplify development with a clean and familiar component model.")
        )
      ),
      section(
        { class: "two-cols" },
        div(
          { class: "left-col" },
          h2("Interactive Counter"),
          p(`Count: ${this.#counter}`),
          button(
            {
              class: "counter-button",
              onclick: () => this.#incrementCounter(),
            },
            "Increment Counter"
          )
        ),
        div(
          { class: "right-col" },
          h2("Code Example"),
          pre(
            { class: "code-block" },
            code(
              `
class CounterComponent extends Stateful {
  #counter = 0;
  #incrementCounter() {
    this.set(() => this.#counter++);
  }
  async build() {
    return div(
      h2("Interactive Counter"),
      p(\`Count: \${this.#counter}\`),
      button(
        { onclick: () => this.#incrementCounter() },
        "Increment Counter"
      )
    );
  }
}`
            )
          )
        )
      ),
      section(
        { class: "cta" },
        h2("Ready to Build?"),
        button(
          {
            class: "get-started",
            // onclick: () => navigate("/get-started"),
          },
          "Get Started"
        )
      ),
      footer(
        { class: "footer" },
        p("© 2024 FrameworkX. Built with ❤️ by developers.")
      )
    );
  }
}

route({
  "/": () => new HomePage(),
});

console.log("FrameworkX Homepage Loaded!");
