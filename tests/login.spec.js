

const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { validateEnv, getEnvVar } = require('../utils/env');

const URL = "https://animated-gingersnap-8cf7f2.netlify.app/"

/**
 * helper function that does the login to demo part of all tests
 * it also does validation on the required env variables
 *
 * @param page
 */
async function login(page){
    //what happens if the .env file is missing?
    //what happens if the .env file is missing the TEST_USERNAME value?

    validateEnv();

    //load .env
    const username = getEnvVar('TEST_USERNAME');
    const password = getEnvVar('TEST_PASSWORD');

    await page.goto(URL);

    //login to demo
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

}

/**
 * test to make sure tasks on the "to do" column have the correct tags
 */
test('Test Case: 1', async ({ page }) => {


    //login to demo
    await login(page);

    //navigate to web application
    await page.getByRole('button', { name: 'Web Application Main web application development' }).click();

    //Verify "Implement user authentication" is in the "To Do" column.
    const toDoColumn = page.locator('h2:has-text("To Do")').locator('..'); // parent div (column)
    const taskCard = toDoColumn.locator('div.bg-white:has(h3:has-text("Implement user authentication"))');

    await expect(taskCard).toBeVisible();

    //Confirm tags: "Feature" "High Priority”
    const featureTag = taskCard.locator('span:has-text("Feature")');
    await expect(featureTag).toBeVisible();

    const highPriorityTag = taskCard.locator('span:has-text("High Priority")');
    await expect(highPriorityTag).toBeVisible();
});

/**
 * test to make sure tasks on the "to do" column have the correct tags
 */
test('Test Case: 2', async ({ page }) => {

    //login to demo
    await login(page);

    //navigate to web application
    await page.getByRole('button', { name: 'Web Application Main web application development' }).click();


    // Verify "Fix navigation bug" is in the "To Do" column.

    const toDoColumn = page.locator('h2:has-text("To Do")').locator('..'); // parent div (column)
    const taskCard = toDoColumn.locator('div.bg-white:has(h3:has-text("Fix navigation bug"))');


    // Confirm tags: "Bug"
    const featureTag = taskCard.locator('span:has-text("Bug")');
    await expect(featureTag).toBeVisible();

});

/**
 * test case to make sure "in progress" column has the correct tags
 */
test('Test Case: 3', async ({ page }) => {

    //login to demo
    await login(page);

    //navigate to web application
    await page.getByRole('button', { name: 'Web Application Main web application development' }).click();


    //Verify "Design system updates" is in the "In Progress" column.
    const inProgressColumn = page.locator('h2:has-text("In Progress")').locator('..'); // parent div (column)
    const taskCard = inProgressColumn.locator('div.bg-white:has(h3:has-text("Design system updates"))');


    // Confirm tags: "Design”
    const featureTag = taskCard.locator('span:has-text("Design")');
    await expect(featureTag).toBeVisible();
});

/**
 * test case to make sure "to do" column has the correct tags in a different tab
 */
test('Test Case: 4', async ({ page }) => {

    //login to demo
    await login(page);

    //Navigate to "Web Application."
    await page.getByRole('button', { name: 'Mobile Application Native mobile app development' }).click();


    // Verify "Design system updates" is in the "In Progress" column.
    const toDoColumn = page.locator('h2:has-text("To Do")').locator('..'); // parent div (column)
    const taskCard = toDoColumn.locator('div.bg-white:has(h3:has-text("Push notification system"))');

    // Confirm tags: "Design”
    const featureTag = taskCard.locator('span:has-text("Feature")');
    await expect(featureTag).toBeVisible();

});

/**
 * test case to make sure "in progress" column has the correct tags in a different tab
 */
test('Test Case: 5', async ({ page }) => {

    //login to demo
    await login(page);

    //Navigate to "Web Application."
    await page.getByRole('button', {name: 'Mobile Application Native mobile app development'}).click();

    //Verify "Offline mode" is in the "In Progress" column.
    const inProgressColumn = page.locator('h2:has-text("In Progress")').locator('..'); // parent div (column)
    const taskCard = inProgressColumn.locator('div.bg-white:has(h3:has-text("Offline mode"))');


    // Confirm tags: "Feature" & "High Priority”
    const featureTag = taskCard.locator('span:has-text("Feature")');
    await expect(featureTag).toBeVisible();

    const highPriorityTag = taskCard.locator('span:has-text("High Priority")');
    await expect(highPriorityTag).toBeVisible();


});

/**
 * test case to make sure "completed" column has the correct tags in a different tab
 */
test('Test Case: 6', async ({ page }) => {

    //login to demo
    await login(page);

    //Navigate to "Web Application."
    await page.getByRole('button', {name: 'Mobile Application Native mobile app development'}).click();


    //Verify "App icon design" is in the "Done" column.
    const inProgressColumn = page.locator('h2:has-text("Done")').locator('..'); // parent div (column)
    const taskCard = inProgressColumn.locator('div.bg-white:has(h3:has-text("App icon design"))');

    //Confirm tags: "Design”
    const featureTag = taskCard.locator('span:has-text("Design")');
    await expect(featureTag).toBeVisible();

});

