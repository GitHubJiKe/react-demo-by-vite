import Store from "../../Store";

export default class Loading {
  static global(loading: boolean) {
    Store.loading(loading);
  }
}
