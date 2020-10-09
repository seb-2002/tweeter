$(document).ready(() => {
  // HELPERS

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweetObj) => {
    let thisLongAgo = howLongAgo(tweetObj.created_at);
    return `<div id="${escape(tweetObj.created_at)}" class="article-container">
    <article>
       <header>
         <div>
           <img src="${tweetObj.user.avatars}" />
           <p>${escape(tweetObj.user.name)}</p>
         </div>
         <p class="handle">${escape(tweetObj.user.handle)}</p>
       </header>
       <p class="tweet">${escape(tweetObj.content.text)}</p>
       <footer>
         <div class="date">${thisLongAgo}</div>
         <div>
           <i class="far fa-flag"></i>
           <i class="fas fa-retweet"></i>
           <i class="fas fa-heart"></i>
         </div>
       </footer>
     </article>
     </div>`;
  };

  const renderTweets = (tweetsArray) => {
    for (const tweetObj of tweetsArray) {
      const tweet = createTweetElement(tweetObj);
      $("section.tweet-container").prepend(tweet);
    }
  };

  const fetchTweets = function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    let count = $(".new-tweet form textarea").val().length;
    if (count < 1 || count > 140) {
      $("div.btn-error").append(
        "<p id='new_tweet_err_mssg'>Please enter a tweet of between 1 and 140 characters.</p>"
      );
      return;
    }
    $("#new_tweet_err_mssg").remove();
    $(".new-tweet form textarea").val("");
    $.ajax({
      url: "/tweets/",
      method: "POST",
      data,
    }).then(loadTweets);
  };

  const loadTweets = function (e) {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then((posts) => {
      $("section.tweet-container").html("");
      renderTweets(posts);
    });
  };

  // IMPLEMENTATION

  // loads tweets on the page when the page loads
  loadTweets();

  // handles the new tweet appearing when submitted
  $(".new-tweet form").submit(fetchTweets);

  // handles the toggle action of the navbar button
  $("#form-toggle").click(function () {
    $("section.new-tweet").slideToggle("slow");
  });

  // handles the scrolling action of the scroll button
  $(".scroll-btn").click(() => {
    $("html, body").animate({ scrollTop: "0" }, "slow");
    $("section.new-tweet").slideToggle("slow");
  });

  // triggers changes to the page on scroll
  // and depending on the scrollTop
  $(document).scroll(() => {
    if ($(document).scrollTop() === 0) {
      $(".scroll-btn").css("display", "none");
      $("#form-toggle").css("display", "flex");
    } else {
      $(".scroll-btn").css("display", "flex");
      $("#form-toggle").css("display", "none");
    }
  });
});
