$(document).ready(function(){

  var title = null;
  var author = null;
  var company = null;
  var publisher = null;
  var url = null;
  var obj = [];
  var search_symbol = null;
  var newSummaryObj = [];
  var newStockObj = [];
  var stockProfileObj = [];
  var newStockProfileObj = [];
  var stockLogoObj = [];
  var getLogoFromStorage = [];

  const searchInput = document.querySelector('.search-input');
  const suggestionPanel = document.querySelector(".suggestions");
  var selectedSuggestionIndex = -1;
  // Main function
  init();

  // Function to empty out the articles
  function clear() {
    title = null;
    author = null;
    company = null;
    publisher = null;
    stockCompanyName = null;
    stockImgClass=null;
    url = null;
    obj = [];
    newSummaryObj = [];
    newStockProfileObj = [];
    stockProfileObj = [];
    getLogoFromStorage = [];
    $(".stats").empty();
    $("#article-section").empty();
  }

  function clearStats(){
    $(".companyId").empty();
    $(".exchange").empty();
    $(".companyName").empty();

    $(".priceValue").empty();
    $(".currencyValue").empty();
    $(".changeAbsolute").empty();
    $(".changePercent").empty();
    // $(".triangle").empty();

    $(".openPriceResult").empty();
    $(".previousClosingResult").empty();
    $(".volumeResult").empty();
    $(".avgVolumeResult").empty();
    $(".marketcapResult").empty();
    $(".dayRangerResult").empty();
    $(".aboutCompanyHeader").empty();
    $(".aboutCompany").empty();
  }

  // Render auto-suggestion for displaying stock companies and symbols based on user entry in search bar
  function renderSelection(resultObj) {
    newStockObj = [];

    // GET fav stocks from DB
    var settings = {
      "url": "/api/add_fav_stock/",
      "data": {"stockName":"Apple","stockSymbol":"APPL","username":"deenuy"},
      "method": "POST",
    }
    $.ajax(settings).done(function (response) {
      console.log(JSON.stringify(response));

    });

    suggestionPanel.classList.add('show');

    var numStockResults = resultObj.ResultSet.Result;

    // Display companies for auto suggestions
    for (var i=0; i<numStockResults.length; i++) {

      // Construct array with news feed objects
      newStockObj.push({
        'id': i,
        'exch': numStockResults[i].exch,
        'exchDisp': numStockResults[i].exchDisp,
        'name': numStockResults[i].name,
        'symbol': numStockResults[i].symbol,
        'type': numStockResults[i].type,
        'typeDisp': numStockResults[i].typeDisp
      });

      // console.log(newStockObj[i].name);

      // Store Stock News Data into Browser Local Storage
      localStorage.setItem('scs_stockSymbos', JSON.stringify(newStockObj));

      const div = document.createElement('div');
      div.innerHTML = newStockObj[i].name +" ("+ "<strong>" + newStockObj[i].symbol + "</strong>" +")";
      div.setAttribute('class', 'suggestion');
      div.setAttribute('dataattr', 'attr'+i);
      suggestionPanel.append(div);

      // Add to watchlist icon on suggestion box
      const favIconEl = document.createElement('i');
      favIconEl.setAttribute('class', 'far fa-star');
      div.append(favIconEl);
      
      // New enhancement to show stock company details in Suggestion Panel (Future Enhancement)

      // <li class="P(0) " data-index="1">
      //   <div role="link" title="Applied Materials, Inc." data-test="srch-sym" tabindex="0" class="Bgc($hoverBgColor):h Cur(p) M(0) Fz(s) Ta(start) Py(9px) Px(20px) Whx(nw) ">
      //     <div class="W(5/8) IbBox Ell">
      //       <div class="C($primaryColor) Fw(b) Mend(10px) W(80px) IbBox Ell" title="AMAT">AMAT</div>
      //       <div class="Ell C($primaryColor) D(i) Va(tb)"><strong>App</strong>lied Materials, Inc.</div>
      //     </div>
      //     <div class="W(3/8) IbBox Ta(end) Fz(xs) C($finDarkGray)">Equity - NMS</div>
      //   </div>
      // </li>
    }
  }
  // reset the selected suggestion list from auto-suggestion feature
  function resetSelectedSuggestion() {
    for (var i=0; i < suggestionPanel.children.length; i++) {
      suggestionPanel.children[i].classList.remove('selected');
    }
  }
  function renderNewsFeed(resultObj) {
    clear();
    // Loop through and build elements for the defined number of articles
    if (resultObj){
      for (var i = 0; i < resultObj.length; i++) {

        // Create the  list group to contain the articles and add the article content for each
        var $articleList = $("<ul>");
        $articleList.addClass("list-group");
  
        // Add the newly created element to the DOM
        $("#article-section").append($articleList);
  
        // If the article has a title, log and append to $articleList
        var $articleListItem = $("<li class='list-group-item articleHeadline'>");
  
        if (resultObj[i].company) {
          $articleListItem.append(
            "<span class='label label-primary' style='background: #03A9F4; color: #fff; padding: 0.2rem; margin-bottom: 0.2rem;'>" +
              "<strong> " +
              resultObj[i].company +
              "</strong>"
          );
        }
  
        // If the article has a byline, log and append to $articleList
        if (resultObj[i].title) {
          $articleListItem.append("<h5 class='newsHeadline' style='margin-top: 0.5rem; margin-bottom: 0.5rem;'>" + resultObj[i].title + "</h5>");
        }
  
        // Log section, and append to document if exists
        if (resultObj[i].author) {
          $articleListItem.append("<h5 class='author' style='margin-top: 0.5rem; margin-bottom: 0.5rem;'>Author: " + resultObj[i].author + "</h5>");
        }
  
        // Log published date, and append to document if exists
        if (resultObj[i].publisher) {
          $articleListItem.append("<h5 class='author' style='margin-top: 0.5rem; margin-bottom: 0.5rem;'>" + resultObj[i].publisher + "</h5>");
        }
  
        // Append news log url
        if (resultObj[i].url) {
          $articleListItem.append("<a href=" + resultObj[i].url + " target='_blank' >" + "read more.." + "</a>");
        }
  
        // Append the article
        $articleList.append($articleListItem);

        // Bookmark Icon
        var $articleListItemBookmark = $("<div class='articleListItemBookmark'>");

        // Append the article
        $articleList.append($articleListItemBookmark);
      }
    }
  }

  // Update news feed article section
  function updatePage(stockObject) {
    
    var numArticles = 6;
    // Get from the form the number of results to display
    if(stockObject.items.result.length < 6){
      numArticles = stockObject.items.result.length;
    }
    
    // Loop through and build elements for the defined number of articles
    for (var i = 0; i < numArticles; i++) {
      // Get specific article info for current index
      title = stockObject.items.result[i].title;
      author = stockObject.items.result[i].author;
      company = stockObject.items.result[i].entities[0].label;
      publisher = stockObject.items.result[i].publisher;
      url = stockObject.items.result[i].link;

      // Construct array with news feed objects
      obj.push({
        'id': i,
        'title': title,
        'author': author,
        'company': company,
        'publisher': publisher,
        'url': url
      });
    }

    // Add to news feed to browser local storage
    storeNews(obj);
  }
  // Function to store the news summary in local storage
  function storeNews(object) {
    // Store Stock News Data into Browser Local Storage
    localStorage.setItem('scs_news_feed', JSON.stringify(object));
  }

  // render the news from local storage
  function renderNews() {
    var newsFeed = JSON.parse(localStorage.getItem('scs_news_feed'));
    renderNewsFeed(newsFeed);
  }

  // Function to fetch attributes from API response and add to localStorage
  function getStockStats(stockStatsObj){
    // console.log(stockStatsObj)
    newSummaryObj = [];

    newSummaryObj.push({
      'companyId': stockStatsObj.price.symbol,
      'market': stockStatsObj.quoteType.market,
      'quoteType': stockStatsObj.quoteType.quoteType,
      'exchange': stockStatsObj.price.exchangeName,
      'quoteType': stockStatsObj.price.quoteType,
      'companyName': stockStatsObj.price.longName,
      'priceText': stockStatsObj.financialData.currentPrice.fmt,
      'currency': stockStatsObj.summaryDetail.currency,
      'openPrice': stockStatsObj.summaryDetail.open.fmt,
      'previousClosing': stockStatsObj.summaryDetail.previousClose.fmt,
      'volume': stockStatsObj.summaryDetail.volume.fmt,
      'avgVolume': stockStatsObj.summaryDetail.averageVolume.fmt,
      'marketCap': stockStatsObj.price.marketCap.fmt,
      'dayHigh': stockStatsObj.summaryDetail.dayHigh.fmt,
      'dayLow': stockStatsObj.summaryDetail.dayLow.fmt
    });

    // Store Stock Summary Data into Browser Local Storage
    localStorage.setItem('scs_stock_statistics', JSON.stringify(newSummaryObj));
  }

  // Function to read the stock stats from local storage
  function renderStockStats(){
    
    newSummaryObj = JSON.parse(localStorage.getItem('scs_stock_statistics'));

    // console.log(newSummaryObj, "Render Stocks Print");

    clearStats();

    if(newSummaryObj) {
      // console.log('Rendering from local storage', newSummaryObj);

      $(".companyId").append(newSummaryObj[0].companyId + " (" + newSummaryObj[0].market + ") ");
      $(".exchange").append(newSummaryObj[0].exchange);
      $(".companyName").append(newSummaryObj[0].companyName);

      $(".priceValue").append(newSummaryObj[0].priceText);
      $(".currencyValue").append(newSummaryObj[0].currency);
      $(".changeAbsolute").append(newSummaryObj[0].priceText);
      $(".changePercent").append(newSummaryObj[0].priceText);
      // $(".triangle").append(newSummaryObj[0].companyName);

      $(".openPriceResult").append(newSummaryObj[0].openPrice);
      $(".previousClosingResult").append(newSummaryObj[0].previousClosing);
      $(".volumeResult").append(newSummaryObj[0].volume);
      $(".avgVolumeResult").append(newSummaryObj[0].avgVolume);
      $(".marketcapResult").append(newSummaryObj[0].marketCap);
      $(".dayRangerResult").append(newSummaryObj[0].dayHigh + " - " + newSummaryObj[0].dayLow);

      $(".aboutCompanyHeader").append("About " + newSummaryObj[0].companyName);

      stockProfileObj = JSON.parse(localStorage.getItem('scs_stock_profile'));

      if(stockProfileObj){
        $(".aboutCompany").append("About " + stockProfileObj[0].longBusinessSummary);
      }

    } else {
      console.log('Local storage is empty');
    }
  }

  // Initializes main function
  function init() {
    renderNews();
    renderStockStats();
    
    // Listener event on user key entry in search bar for auto-suggestion of stock company and symbol
    searchInput.addEventListener('keyup', function(e){
      suggestionPanel.innerHTML = '';

      const input = searchInput.value;
      var region = $(".search-input-region").val();

      if(input){

        // Make the AJAX request to the API - Get auto complete suggestion by term or phrase
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/auto-complete?region="+region+"&query="+input,
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "88d999ffd3msh5b7eb7230c1ef95p1ff909jsn76383fb30752"
          }
        }

        $.ajax(settings).done(function (response) {
          renderSelection(response);
        });
      }

      if (input === ''){
          suggestionPanel.innerHTML = '';
      }

      // Keyboard company suggestion selection
      if (e.key === 'ArrowDown'){
          resetSelectedSuggestion();
          selectedSuggestionIndex = (selectedSuggestionIndex < suggestionPanel.children.length - 1) ? selectedSuggestionIndex + 1 : selectedSuggestionIndex.children.length - 1;

          suggestionPanel.children[selectedSuggestionIndex].classList.add('selected');
          return;
      }
      if (e.key === 'ArrowUp'){
          resetSelectedSuggestion();
          selectedSuggestionIndex = (selectedSuggestionIndex > 0) ? selectedSuggestionIndex - 1 : 0;

          suggestionPanel.children[selectedSuggestionIndex].classList.add('selected');
          return;
      }
      if (e.key === 'Enter'){
          searchInput.value = suggestionPanel.children[selectedSuggestionIndex].innerHTML;
          suggestionPanel.classList.remove('show');
          selectedSuggestionIndex = -1;
          return;
      }
      if (e.key === 'Backspace'){
        suggestionPanel.classList.remove('show');
        return;
      }
    })

    // Listener on click event to display the suggestion in search bar 
    document.addEventListener('click', function(e){
    
      if(e.target.className === 'suggestion') {
          // display selected company in search input value
          search_symbol = e.target.innerHTML;

          // On selection, hide suggestion list
          suggestionPanel.classList.remove('show');
          
          // From selected stock company from auto suggestion extract Symbol. Ex: Apple Inc. (AAPL). Result is AAPL
          search_symbol = search_symbol.split(">")[1].split("<")[0];

          searchInput.value = search_symbol;
      }
    })

    // Add to watchlist Click event for Suggesntion Panel
    document.addEventListener('click', function(e){

      // console.log(e.target.classList[0]);

      if(e.target.classList[0] === 'far') {
        // Change the star mark to solid star icon
        console.log($(e.target.classList));
        $(e.target).removeClass('far fa-star').addClass('fas fa-star');
        console.log(e.target.classList);

        // /api/add_fav_stock {"stockName":"Apple","stockSymbol":"APPL","username":"Smith123"}

        var settings = {
          "url": "/api/add_fav_stock/",
          "data": {"stockName":"Apple","stockSymbol":"APPL","username":"deenuy"},
          "method": "POST",
        }
        $.ajax(settings).done(function (response) {
          console.log(JSON.stringify(response));

        });


      } else if(e.target.classList[0] === 'fas') {
        // Change the star mark to solid star icon
        console.log($(e.target.classList));
        $(e.target).removeClass('fas fa-star').addClass('far fa-star');

        // /api/add_fav_stock {"stockName":"Apple","stockSymbol":"APPL","username":"Smith123"}

        var settings = {
          "url": "/api/delete_fav_stock/",
          "data": {"stockSymbol":"APPL","username":"deenuy"},
          "method": "DELETE",
        }
        $.ajax(settings).done(function (response) {
          console.log(JSON.stringify(response));
        });

        console.log(e.target.classList);
      } 
      
    })
    
    // .on("click") function associated with the Search Button
    $("#run-search-01").click(function(event) {
      event.preventDefault();

      // var region = $("#start-year").val().trim();
      var region = $(".search-input-region").val();

      // Return from function early if submitted input is blank
      if (company === "") {
        return;
      }

      // AJAX request to get stock logo 
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://flipvo.p.rapidapi.com/api/rapid/company/quote/"+search_symbol,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "flipvo.p.rapidapi.com",
          "x-rapidapi-key": "88d999ffd3msh5b7eb7230c1ef95p1ff909jsn76383fb30752"
        }
      }
      
      $.ajax(settings).done(function (response) {
        // console.log(response);
        // $(".stock-image").attr('src', response[0].logo)
        let stockImgClass = document.getElementsByClassName('stock-image');
        let stockCompanyName = document.getElementsByClassName('stock-name');
        let stockFavProfile = document.getElementsByClassName('stockFavProfile');
        // console.log(stockImgClass.length)

        stockLogoObj.push({
          'logo': response[0].logo,
          'symbol': response[0].symbol,
          'companyName': response[0].companyName,
          'website': response[0].website,
        });

        // Store Stock Summary Data into Browser Local Storage
        localStorage.setItem('scs_stock_logo', JSON.stringify(stockLogoObj));

        // Get logos from local browser storage
        getLogoFromStorage = JSON.parse(localStorage.getItem('scs_stock_logo'));
        // console.log(getLogoFromStorage.length)
        var i = 0;
        var j = getLogoFromStorage.length;

        for (var i=0; i < stockImgClass.length; i++){
          if(getLogoFromStorage.length>i){
            stockImgClass[i].setAttribute('src', getLogoFromStorage[i].logo);
            stockCompanyName[i].innerHTML= getLogoFromStorage[i].companyName;
            stockFavProfile[i].classList.add('show');
          } else{
            return;
          }
        }
      });

      // // AJAX request to get stock news of selected stock symbol and region from RAPID API Yahoo Finance
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news?region="+region+"&category="+search_symbol,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "88d999ffd3msh5b7eb7230c1ef95p1ff909jsn76383fb30752"
        }
      }

      $.ajax(settings).done(function (response) {
          // console.log(response);
          updatePage(response);
      });

      // AJAX request to get stock company profile of selected stock symbol and region from RAPID API Yahoo Finance
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-profile?"+region+"&symbol="+search_symbol,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": "88d999ffd3msh5b7eb7230c1ef95p1ff909jsn76383fb30752"
        }
      }
      
      $.ajax(settings).done(function (response4) {
        // console.log(response4 + "Stock Profile Response");
        
        newStockProfileObj.push({
          'sector': response4.assetProfile.sector,
          'fullTimeEmployees': response4.assetProfile.fullTimeEmployees,
          'longBusinessSummary': response4.assetProfile.longBusinessSummary,
          'city': response4.assetProfile.city,
          'state': response4.assetProfile.state,
          'country': response4.assetProfile.country,
          'industry': response4.assetProfile.industry,
          'website': response4.assetProfile.website,
          // 'ceo': response4.companyOfficers[0].name,
          // 'ceoTitle': response4.companyOfficers[0].title,
        });

        // Store Stock Summary Data into Browser Local Storage
        localStorage.setItem('scs_stock_profile', JSON.stringify(newStockProfileObj));


        // AJAX request to get stock summary of selected stock symbol and region from RAPID API Yahoo Finance
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-statistics?"+region+"&symbol="+search_symbol,
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "88d999ffd3msh5b7eb7230c1ef95p1ff909jsn76383fb30752"
          }
        }
        
        $.ajax(settings).done(function (response1) {
          // console.log(response1)
          getStockStats(response1);

          // Render in HTML news feed
          renderNews();
          renderStockStats();
        });

      });

      // AJAX request to get Charts of selected stock symbol and region from RAPID API Yahoo Finance
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&region=US&lang=en&range=1mo&symbol="+search_symbol,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": "88d999ffd3msh5b7eb7230c1ef95p1ff909jsn76383fb30752"
        }
      }
      
      $.ajax(settings).done(function (response3) {
        // console.log(response3.chart.result[0]);

        // Store Chart Data into Browser Local Storage
        if(response3.chart.result[0]){
          localStorage.setItem('scs_stock_chart', JSON.stringify(response3.chart.result[0]));
        }
      });
    });
  }
});