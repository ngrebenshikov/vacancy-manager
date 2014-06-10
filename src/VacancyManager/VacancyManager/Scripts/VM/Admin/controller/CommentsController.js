Ext.define('VM.controller.CommentsController',
    { extend: 'Ext.app.Controller',
        models: ['Comment'],
        stores: ['Comments'],
        views: ['Comments.List', 'Comments.Manage', 'Comments.Add', 'Comments.Edit'],

        init: function () {
            this.control({

                'button[action=updateCommentsList]': {
                    click: this.updateCommentsList
                },

                'button[action=clearCommentArea]': {
                    click: this.clearCommentArea
                },

                'button[action=addComment]': {
                    click: this.addComment
                }
            });
        },


        clearCommentArea: function (button) {
            Ext.getCmp('txtareaConsiderationComment').setValue('');
        },

        addComment: function (button) {
            var newCommentValue = Ext.getCmp('txtareaConsiderationComment').getValue(),
                commentsStore = this.getCommentsStore(),
                consideration = commentsStore.consideration,
                considerationId = consideration.getId(),
            newComment = Ext.create('VM.model.Comment', {
                Body: newCommentValue,
                ApplicantId: commentsStore.consideration.get('ApplicantID'),
                CreationDate: (Ext.Date.format(new Date(), 'd.m.Y')),
                ConsiderationID: considerationId

            });

            commentsStore.insert(0, newComment);
            consideration.changeComment(newCommentValue);
            console.log(consideration);

        },

        updateCommentsList: function (button) {
            commentsStore = this.getCommentsStore(),
                considerationId = commentsStore.consideration.getId(),
            commentsStore.load({ params: { "considerationId": considerationId} });
        }
    });