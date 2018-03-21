export default {
  items: [
    {
      title: true,
      name: "Application Menu",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "text-left" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "fa fa-tachometer",
      badge: {
        variant: "success",
        text: "New"
      }
    },
    {
      title: true,
      name: "User Menu",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "text-left" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "My Account",
      url: "/account",
      icon: "fa fa-user-circle",
      badge: {
        variant: "warning",
        text: "Help"
      }
    }
  ]
};
