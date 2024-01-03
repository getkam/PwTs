import { login } from "./support/pom/utils/login.page.utils";
import config from "config";
import { test, expect } from "@playwright/test";
import Navbar from "./support/pom/sections/navBar.section";
import Utils from "./support/pom/utils/common.utils";

interface UserLoginRequest {
  user: { email: string; password: string };
}

interface NewArticleRequest {
  articles: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };
}

test("should login user via API", async ({ page }) => {
  const userLoginRequest: UserLoginRequest = {
    user: {
      email: await config.get("email"),
      password: await config.get("password"),
    },
  };
  await page.goto(await config.get("url"));

  const response = await page.request.fetch(
    (await config.get("apiUrl")) + "users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      timeout: 60000,
      data: userLoginRequest,
    }
  );

  const status = response.status();
  const token = (await response.json()).user.token;
  expect(status).toBe(200);

  await page.evaluate((token) => {
    localStorage.setItem("jwtToken", token);
  }, token);

  await page.reload();

  const navbar = new Navbar(page);
  expect(await navbar.getProfileName()).toContain(await config.get("username"));

  await page.goto(await config.get("url"));
});

test("gets the json from api and adds a new tag", async ({ page }) => {
  // Get the response and add to it

  await page.route("*/**/api/tags", async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.tags.push("newTaddg");
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.fulfill({ response, json });
  });
  // Go to the page
  await page.goto(await config.get("url"));
  // Assert that the new fruit is visible
  await expect(page.getByText("newTaddg", { exact: true })).toBeVisible();
});

test("gets the json from api and adds a new article", async ({ page }) => {
  const articleTitle = `newTitle-${Utils.randomNumber}`;
  await page.route("*/**/api/articles?limit=10&offset=0", async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.articles.push({
      slug: "newSlug",
      title: articleTitle,
      description:
        "Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut cupiditate est facere omnis possimus. Tenetur similique nemo illo soluta molestias facere quo. Ipsam totam facilis delectus nihil quidem soluta vel est omnis.",
      body: "Quia quo iste et aperiam voluptas consectetur a omnis et. Facere beatae delectus ut. Possimus voluptas perspiciatis voluptatem nihil sint praesentium. Sint est nihil voluptates nesciunt voluptatibus temporibus blanditiis.Officiis voluptatem earum sed. Deserunt ab porro similique est accusamus id enim aut suscipit.Soluta reprehenderit error nesciunt odit veniam sed. Dolore optio qui aut ab. Aut minima provident eius repudiandae a quibusdam in nisi quam.",
      tagList: ["newTag", "tag2", "tag3", "tag4"],
      createdAt: "2021-10-31T13:40:00.000Z",
      updatedAt: "2021-10-31T13:40:00.000Z",
      favorited: true,
      favoritesCount: 0,
      author: {
        username: "Kubus Puchatek",
        bio: null,
        image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
        following: true,
      },
    });
    await route.fulfill({ response, json });
  });

  await login(page, await config.get("email"), await config.get("password"));
  await page.waitForRequest("**/api/articles*");
  await page.waitForSelector(
    '.article-preview:not(:has-text("Loading articles..."))'
  );
  await expect(page.getByText(articleTitle, { exact: true })).toBeVisible();
});
