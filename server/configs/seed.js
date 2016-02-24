import {Meteor} from 'meteor/meteor';
import {SlideDecks} from '/lib/collections';

export function generateSeed() {
  if (process.env.NODE_ENV !== 'production' && SlideDecks.find().fetch().length === 0) {
    // SlideDecks.remove({});

    let sdDoc = {
      prId: 'testPrId',
      ownerId: 'testOwnerId',
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
        					"content" : "@@ -3,10 +3,11 @@ Router.configure({",
        					"changes" : [
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 3,
        							"ln2" : 3,
        							"content" : " });"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 4,
        							"ln2" : 4,
        							"content" : " "
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 5,
        							"ln2" : 5,
        							"content" : " Router.route('/', {"
        						},
        						{
        							"type" : "del",
        							"del" : true,
        							"ln" : 6,
        							"content" : "-\tname: 'home',"
        						},
        						{
        							"type" : "del",
        							"del" : true,
        							"ln" : 7,
        							"content" : "-  template: 'home'"
        						},
        						{
        							"type" : "add",
        							"add" : true,
        							"ln" : 6,
        							"content" : "+\tname: 'iii',"
        						},
        						{
        							"type" : "add",
        							"add" : true,
        							"ln" : 7,
        							"content" : "+  template: 'iii'"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 8,
        							"ln2" : 8,
        							"content" : " });"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 9,
        							"ln2" : 9,
        							"content" : " "
        						},
        						{
        							"type" : "add",
        							"add" : true,
        							"ln" : 10,
        							"content" : "+"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 10,
        							"ln2" : 11,
        							"content" : " // Admin Routes"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 11,
        							"ln2" : 12,
        							"content" : " "
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 12,
        							"ln2" : 13,
        							"content" : " Router.onBeforeAction(function () {"
        						}
        					],
        					"oldStart" : 3,
        					"oldLines" : 10,
        					"newStart" : 3,
        					"newLines" : 11
        				},
        				{
        					"content" : "@@ -27,6 +28,12 @@ Router.route('/admin/settings', {",
        					"changes" : [
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 27,
        							"ln2" : 28,
        							"content" : "   }"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 28,
        							"ln2" : 29,
        							"content" : " });"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 29,
        							"ln2" : 30,
        							"content" : " "
        						},
        						{
        							"type" : "add",
        							"add" : true,
        							"ln" : 31,
        							"content" : "+var type = \"example\";"
        						},
        						{
        							"type" : "add",
        							"add" : true,
        							"ln" : 32,
        							"content" : "+"
        						},
        						{
        							"type" : "add",
        							"add" : true,
        							"ln" : 33,
        							"content" : "+newComponent() {"
        						},
        						{
        							"type" : "add",
        							"add" : true,
        							"ln" : 34,
        							"content" : "+    return components[type]({ attribute: \"value\" });"
        						},
        						{
        							"type" : "add",
        							"add" : true,
        							"ln" : 35,
        							"content" : "+};"
        						},
        						{
        							"type" : "add",
        							"add" : true,
        							"ln" : 36,
        							"content" : "+"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 30,
        							"ln2" : 37,
        							"content" : " Router.route('/admin/categories', {"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 31,
        							"ln2" : 38,
        							"content" : "   name: 'adminCategories',"
        						},
        						{
        							"type" : "normal",
        							"normal" : true,
        							"ln1" : 32,
        							"ln2" : 39,
        							"content" : "   template: 'adminCategories',"
        						}
        					],
        					"oldStart" : 27,
        					"oldLines" : 6,
        					"newStart" : 28,
        					"newLines" : 12
        				}
        			],
        			"deletions" : 2,
        			"additions" : 9,
        			"from" : "fix.js",
        			"to" : "fix.js",
        			"index" : [
        				"b49f18c..79a49e3",
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
