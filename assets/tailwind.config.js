/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  module.exports = {

    plugins: [
        require('flowbite/plugin')
    ]

}
module.exports = {

    content: [
        "./node_modules/flowbite/**/*.js"
    ]

}