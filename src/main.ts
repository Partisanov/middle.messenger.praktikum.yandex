import Handlebars from "handlebars";
import * as Layouts from "./layouts";
import * as Components from "./components";
import * as Pages from "./pages";

const pages = {
  login: [Pages.LoginPage, { login: "ivanivanov", password: "test" }],
  registration: [
    Pages.RegistrationPage,
    {
      email: "pochta@yandex.ru",
      login: "ivanivanov",
      first_name: "Иван",
      second_name: "Иванов",
      phone: "+7(909)9673030",
      password: "qwerty123",
    },
  ],
  "404": [
    Pages.ErrorPage,
    { errorNumber: "404", errorMessage: "Не туда попали" },
  ],
  "500": [
    Pages.ErrorPage,
    { errorNumber: "500", errorMessage: "Мы уже фиксим" },
  ],
  messenger: [Pages.MessengerPage],
  profile: [
    Pages.ProfilePage,
    {
      email: "pochta@yandex.ru",
      login: "ivanivanov",
      first_name: "Иван",
      second_name: "Иванов",
      display_name: "Иван",
      phone: "+7(909)9673030",
    },
  ],
  editProfile: [
    Pages.EditProfilePage,
    {
      email: "pochta@yandex.ru",
      login: "ivanivanov",
      first_name: "Иван",
      second_name: "Иванов",
      display_name: "Иван",
      phone: "+7(909)9673030",
    },
  ],
  changePassword: [
    Pages.ChangePasswordPage,
    {
      oldPassword: "qwerty123",
      newPassword: "qwerty12",
      newPassword2: "qwerty1234",
    },
  ],
};

Object.entries(Layouts).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});
Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById("app")!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("login"));

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get("page") || "login";

  // Если страница существует, переходим на нее, в противном случае - на страницу ошибки 404
  // @ts-ignore
  if (pages[pageParam]) {
    navigate(pageParam);
  } else {
    navigate("404");
  }
});

document.addEventListener("click", (e) => {
  //@ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
