import { Page } from "playwright";
import LoginPage from "../pages/login.page";
import Navbar from "../components/navBar.component";
import config from "config";
import { login } from "./login.page.utils";

export default class Utils {
  public static readonly randomNumber = Math.floor(Math.random() * 1000000000);
}
