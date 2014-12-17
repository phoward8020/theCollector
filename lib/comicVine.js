//
// Helper functions for working with the Comic Vine API
//
// - buildSearchURL(options)
//
// - queryAPI(searchURL, callback)
//
//

var request = require('request');
var moment  = require('moment');

module.exports = {

    buildSearchURL:function(options) {
        var today = moment().format("YYYY-MM-DD");
        var defaults = {
            'baseURL':'http://www.comicvine.com/api',
            'searchField':'issues',
            'id':'',
            'filterField':'name',
            'filterValue':'',
            'sortField':'cover_date',
            'sortOrder':'desc',
            'format':'json',
            'limit':'10',
            'offset':'0',
            'key':process.env.comic_vine_api_key
        }

        if (options) {
            for (key in options) {
                defaults[key] = options[key];
            }
        }

        var searchURL = '';
        console.log(defaults.id);
        switch(defaults.id) {
            case '':         // << NOT searching for specific item
                searchURL = defaults.baseURL +
                  '/' + defaults.searchField + 
                  '/?'+ 'filter=' + defaults.filterField + ':' + defaults.filterValue +
                  '&' + 'sort=' + defaults.sortField + ':' + defaults.sortOrder +
                  '&' + 'format=' + defaults.format +
                  '&' + 'limit=' + defaults.limit +
                  '&' + 'offset=' + defaults.offset +
                  '&' + 'api_key=' + defaults.key;
                  console.log('>>>>> searchURL: ', searchURL);
                break;
            default:            // << Searching for specific item
                var typeID = '';
                switch(defaults.searchField){
                    case 'issue':
                        typeID = '4000';
                        break;
                    case 'character':
                        typeID = '4005';
                        break;
                    case 'publisher':
                        typeID = '4010';
                        break;
                    case 'concept':
                        typeID = '4015';
                        break;
                    case 'location':
                        typeID = '4020';
                        break;
                    case 'person':
                        typeID = '4040';
                        break;
                    case 'storyarc':
                        typeID = '4045';
                        break;
                    case 'volume':
                        typeID = '4050';
                        break;
                    case 'object':
                        typeID = '4055';
                        break;
                    case 'team':
                        typeID = '4060';
                        break;
                    default:
                        // If none of the above match, the searchURL can't
                        // be properly formed. Should throw an error here
                        // or something.
                        break;
                }
                searchURL = defaults.baseURL +
                  '/' + defaults.searchField + 
                  '/' + typeID + '-' + defaults.id + 
                  '?' + 'format=' + defaults.format +
                  '&' + 'api_key=' + defaults.key;
                break;
        }

        return searchURL;
    },

    queryAPI:function(searchURL, callback) {
        request(searchURL, callback)
    },

    getUpcomingReleases:function(){}
}