// import * as Pages from '../pages';
//
// const PAGES = {
//   login: Pages.LoginPage,
//   registration: Pages.RegistrationPage,
//   messenger: Pages.MessengerPage,
//   notFound: Pages.NotFoundPage,
//   internalError: Pages.InternalErrorPage,
//   profile: Pages.ProfilePage,
//   changePassword: Pages.ChangePasswordPage,
//   editProfile: Pages.EditProfilePage,
// };
//
// export function navigate(page?: keyof typeof PAGES): void {
//   const app = document.getElementById('app');
//
//   // Очищаем старое содержимое страницы
//   if (app) {
//     app.innerHTML = '';
//   }
//
//   // Получаем значение 'page' из параметра или query параметра URL
//   const specifiedPage = page || getPageFromQuery();
//
//   // Проверяем, что переданная страница существует в PAGES
//   if (specifiedPage && PAGES[specifiedPage]) {
//     // Устанавливаем query параметр 'page'
//     setQueryParameter('page', specifiedPage);
//
//     const Component = PAGES[specifiedPage];
//     const component = new Component();
//     app?.append(component.getContent()!);
//   } else {
//     // Если страница не найдена, можно отобразить, например, страницу NotFoundPage
//     const notFoundComponent = new Pages.NotFoundPage();
//     app?.append(notFoundComponent.getContent()!);
//   }
// }
//
// function getPageFromQuery(): keyof typeof PAGES | undefined {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get('page') as keyof typeof PAGES | undefined;
// }
//
// function setQueryParameter(key: string, value: string): void {
//   const url = new URL(window.location.href);
//   url.searchParams.set(key, value);
//   window.history.replaceState({}, '', url.href);
// }
