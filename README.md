
# Discover Stock and Commodity things

## User Story: 
As a commodity and stock market follower, we want to discover new companies and expand the horizon of the investment selections. If the company does not align with the investment criteria, we would still be able to retain the information, for daily conversations with the peers, or future investment opportunities. 

## Background: 
There are multiple finance data providers, i.e Bloomberg, Yahoo Finance, Google Finance, TSX, and many more. These websites are often too complex for users who lack indepth finance background or it often takes too long to find some information because it provides a wide ranges of data. 

We would like to have the ability to search for a company and be able to learn more about what they do, and especially what type of commodity they trade, or simply what industry they are in.

If we are interested in that company, we would also want to know what the company is up to and if there is any material changes or updates from that company. 

## Benefits: 
Using the Discover Stock and Commodity things application, within one search, you will able to get a summary of the company's profile, some keypoints and the news related to it. The tool saves you the time digging around other complex tools that provides various financial news and data including stock details, quotes, press releases, financial reports that you might not need yet for deep analysis. 

This Discover Stock and Commodity things tool is not made tailor to finance experts who need a wide range of data for their analysis. This tool is created to simplify the users' process and to summarize a few main datapoints for a quick inquiry into a company profile. 

Hosted Url: https://deenuy.github.io/SCS_Stock_Commodity_News/

## This repo contains:
* README.md 
* Index.html
* CSS/style.css for custom styling
* scripts/ajax-api.js for implementaiton logic
* scripts/stocks-chart.js for financial stock chart
* assets/img for the images used in webpage

## Usage:
On the main search bar, the user can type in the company name they want to learn about and hit the Search button. 

The region will be the default value which is US, the default language is English. 

The website will return a maximum of 6 news article related to the company on the left, company's statistics on the right side and a chart of the company's stock price. 

The data is retrieved from Yahoo Finance API, Yahoo Finance API is a reliable source of stock market data. It also provides other financial information including market summaries, historical quotes, news feed and financial reports. 

## Future Development:
- Enhance the user experience for discovering stocks and commodities
- Integrate ML algorithms to recommend news to steer the user to decide to buy or sell the stocks
- Provision for tagging the companies that you want to quickly search or track

### Demo

![Stock Demo](assets/img/demo.gif)

## Credits:
* Deenu Yadav
* Ashley Hoang