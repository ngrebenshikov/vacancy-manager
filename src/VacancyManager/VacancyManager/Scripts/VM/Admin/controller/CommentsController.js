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
            var newComment = Ext.getCmp('txtareaConsiderationComment'),
                commentsStore = this.getCommentsStore(),
                considerationId = commentsStore.consideration.getId(),
            newComment = Ext.create('VM.model.Comment', {
                Body: newComment.getValue(),
                ApplicantId : commentsStore.consideration.get('ApplicantID'),
                CreationDate: (Ext.Date.format(new Date(), 'd.m.Y')),
                ConsiderationID: considerationId
               
            });

            commentsStore.insert(0, newComment);
        },

        updateCommentsList: function (button) {
            commentsStore = this.getCommentsStore(),
                considerationId = commentsStore.consideration.getId(),
            commentsStore.load({ params: { "considerationId": considerationId} });
        }
    });