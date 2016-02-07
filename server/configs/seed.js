import {Meteor} from 'meteor/meteor';
import {SlideDecks} from '/libs/collections';

export function generateSeed() {
  if (process.env.NODE_ENV !== 'production' && SlideDecks.find().fetch().length === 0) {
    // SlideDecks.remove({});

    let sdDoc = {
      presentationId: 'testPresentationId',
      slides: [
        {
          type: 'single',
          number: 1,
          data: {
            title: 'Slide 1',
            file: {
        			"chunks" : [
        				{
        					"content" : "@@ -40,4 +40,4 @@ Warning: incoming random string ajsf09023jrn0fasd",
        					"changes" : [
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 40,
        							"ln2" : 40,
        							"content" : " Warning: incoming random string ajsf09023jrn0fasd"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 41,
        							"ln2" : 41,
        							"content" : " Warning: incoming random string ajsf09023jrn0fasd"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 42,
        							"ln2" : 42,
        							"content" : " Warning: incoming random string ajsf09023jrn0fasd"
        						},
        						{
        							"type" : "del",
        							"del" : true,
        							"ln" : 43,
        							"content" : "-Warning: incoming random string ajsf09023jrn0fasd"
        						},
        						{
        							"type" : "add",
        							"add" : true,
        							"ln" : 43,
        							"content" : "+Warning: incoming random string ajsf09023jrn0fasaad"
        						}
        					],
        					"oldStart" : 40,
        					"oldLines" : 4,
        					"newStart" : 40,
        					"newLines" : 4
        				}
        			],
        			"deletions" : 1,
        			"additions" : 1,
        			"from" : "README.md",
        			"to" : "README.md",
        			"index" : [
        				"57abc80..cb7618f",
        				"100644"
        			]
        		}
          }
        },
        {
          type: 'single',
          number: 2,
          data: {
            title: 'Slide 2',
            file: {
              "chunks" : [
                {
                  "content" : "@@ -40,4 +40,4 @@ hello world ajsf09023jrn0fasd",
                  "changes" : [
                    {
                      "type" : "normal",
                      "normal" : true,
                      "ln1" : 40,
                      "ln2" : 40,
                      "content" : " hello world ajsf09023jrn0fasd"
                    },
                  ],
                  "oldStart" : 40,
                  "oldLines" : 4,
                  "newStart" : 40,
                  "newLines" : 4
                }
              ],
              "deletions" : 1,
              "additions" : 1,
              "from" : "README.md",
              "to" : "README.md",
              "index" : [
                "57abc80..cb7618f",
                "100644"
              ]
            }
          }
        }
      ]
    };

    SlideDecks.insert(sdDoc);
    console.log('generated seed');
  }
}
