/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready. */

$(function () {

    /* A test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application. */


    describe('RSS Feeds', () => {
        /* A test to make sure that the allFeeds variable has 
         * been defined and that it is not empty */

        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object,
         * and ensures it has a URL defined
         * and that the URL is not empty.*/

        it("Url are defined", () => {
            allFeeds.forEach((feed) => {
                const url = feed.url;
                expect(url).toBeDefined();
                expect(url.trim()).not.toBe('');
            });
        });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty. */

        it("Names are defined", () => {
            allFeeds.forEach((feed) => {
                const name = feed.name;
                expect(name).toBeDefined();
                expect(name.trim()).not.toBe('');
            });
        });
    });


    /*test suite "The menu" */
    describe("The menu", () => {
        let menu;

        beforeEach(() => {
            menu = document.querySelector('body');

        });

        /* Ensures the menu element is hidden by default.*/
        it('The menu is hidden by default', () => {
            expect(menu).toHaveClass('menu-hidden');
        });

        /* Ensures the menu changes visibility when the menu icon is clicked.
         * This test have two expectations: does the menu display when
         * clicked and does it hide when clicked again.*/

        it('The menu changes visibility on click', () => {
            const menuIcon = document.querySelector('a.menu-icon-link');
            // on the first click it supposed to remove menu-hidden class
            menuIcon.click();
            expect(menu).not.toHaveClass('menu-hidden');
            // on the second click it supposed to add menu-hidden class
            menuIcon.click();
            expect(menu).toHaveClass('menu-hidden');
        });
    });

    /* test suite  "Initial Entries" */
    describe('Initial Entries', () => {

        /* Ensures when the loadFeed function is called and completes its work,
         * And there is at least a single .entry element within the .feed container.*/
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });

        it('there is atleast a single entry element inside the feed container', () => {
            const entries = document.querySelectorAll('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
        });


    });

    /* test suite  "New Feed Selection" */
    describe('New Feed Selection', () => {

        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.*/

        let oldFeed,
            newFeed;

        beforeEach((done) => {
            loadFeed(0, () => {
                oldFeed = document.querySelector('.feed').innerHTML;

                loadFeed(1, () => {
                    newFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
        });
        // compare between the old feed and the newest one
        it('A new feed is loaded', () => {
            expect(oldFeed).not.toEqual(newFeed);
        });

    });

}());