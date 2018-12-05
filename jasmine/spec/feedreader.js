/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        // hook before each spec to check if the allFeeds list has values
        beforeEach(function () {
            expect(allFeeds).toBeDefined();
        });
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('list has feed urls defined', function() {
            for (const feed of allFeeds) {
                (function(feed) {
                    expect(feed.url).toBeDefined();
                    expect(feed.url).toBeTruthy();
                    // checking for http in the url. (optional)
                    expect(feed.url).toMatch(/(http)+/);
                }(feed));
            }
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('list has feed names defined', function() {
            for (const feed of allFeeds) {
                (function(feed) {
                    expect(feed.name).toBeDefined();
                    expect(feed.name).toBeTruthy();
                }(feed));
            }
        });
    });


    /* a test suite named "The menu" */
    describe('The menu', function() {

        /* a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            const bodyElement = document.body;
            const classList = bodyElement.classList;

            expect(classList.contains('menu-hidden')).toBe(true);
        });

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('toggles on/off when clicked', function() {
            const menuIcon = $('.menu-icon-link');

            clickEvent(true);

            menuIcon.click();
            clickEvent(false);

            menuIcon.click();
            clickEvent(true);
        });
    });

    /*
     * function to check if the class is toggled or not
     */
    function clickEvent(flag) {
        const bodyElement = document.body;
        // The class hidden menu hides the sliding menu
        expect(bodyElement.classList.contains('menu-hidden')).toBe(flag);
    }

    /* a test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        // making an async call and passing a callback,
        // which invokes done(), so that the following
        // test spec executes
        beforeEach(function(done) {
            try {
                loadFeed(0, function() {
                    done();
                });
            } catch(e) {
                done.fail(e);
            }
        });
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should be present for each feed', function(done) {
            const entryList = $('.feed .entry');
            expect(entryList.length).not.toBe(0);
            done();
        });
    });

    /* a test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let content = $('.feed').text();
        // making an async call and passing a callback,
        // which invokes done(), so that the following
        // test spec executes
        beforeEach(function(done) {
            try {
                
                loadFeed(0, function() {
                    done();
                });
            } catch(e) {
                // done.fail(e);
            }
        });

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('should produce different content', function(done) {
            const newContent = $('.feed').text();
            expect(newContent).not.toBe(content);
            done();
        });
    });
}());
