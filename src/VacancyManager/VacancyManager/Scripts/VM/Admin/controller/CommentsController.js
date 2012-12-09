Ext.define('VM.controller.CommentsController',
    { extend: 'Ext.app.Controller',
        models: ['Comment'],
        stores: ['Comments'],
        views: ['Comments.List', 'Comments.Manage', 'Comments.Add', 'Comments.Edit'],

        init: function () {
            this.control({
                'button[action = loadBlankComment]': {
                    click: this.loadBlankComment
                },
                'button[action = addComment]': {
                    click: this.addComment
                }
                ,
                'button[action = updateComment]': {
                    click: this.updateComment
                },
                'button[action = editComment]': {
                    click: this.editComment
                },
                'button[action = deleteComment]': {
                    click: this.deleteComment
                }
            });
        },
        deleteComment: function (button) {
            var grid = button.up('grid'),
            commentsStore = grid.getStore(),
            selectedComment = grid.getView().getSelectionModel().getSelection()[0];
            if (selectedComment != undefined) {
                Ext.Msg.show({
                    title: 'Удаление комментария',
                    msg: 'Уладить выбранный комментарий?',
                    width: 300,
                    buttons: Ext.Msg.YESNO,
                    fn: function (btn) {
                        if (btn == 'yes') {
                            if (selectedComment) {
                                commentsStore.remove(selectedComment);
                            }
                        }
                    }
                });
            }

        },

        editComment: function (button) {
            var wndCommentsManage = button.up('window'),
                frmCommentsManage = wndCommentsManage.down('form'),
                commentsGrid = frmCommentsManage.down('grid'),
                currentComment = commentsGrid.getSelectionModel().getSelection()[0],
                wndCommentsEdit = Ext.create('VM.view.Comments.Edit');
            wndCommentsEdit.down('form').loadRecord(currentComment);

        },

        updateComment: function (button) {
            var wndCommentsEdit = button.up('window'),
                commentsStore = this.getCommentsStore(),
                frmCommentsEdit = wndCommentsEdit.down('form'),
                currentComment = frmCommentsEdit.getRecord();
            currentComment.set(frmCommentsEdit.getValues());
            wndCommentsEdit.close();
        },

        addComment: function (button) {
            var wndCommentsAdd = button.up('window'),
                commentsStore = this.getCommentsStore(),
                frmCommentsAdd = wndCommentsAdd.down('form'),
                currentComment = frmCommentsAdd.getRecord();
            currentComment.set(frmCommentsAdd.getValues());
            commentsStore.insert(0, currentComment);
            wndCommentsAdd.close();
        },

        loadBlankComment: function () {
            var wndCommentsAdd = Ext.create('VM.view.Comments.Add');
            wndCommentsAdd.show(),
            commentsStore = this.getCommentsStore(),
            newComment = Ext.create('VM.model.Comment', {
                Body: "Новый комментарий",
                CreationDate: (Ext.Date.format(new Date(), 'd.m.Y')),
                ConsiderationID: commentsStore.consideration.getId(),
                User: 'newUser'
            });

            wndCommentsAdd.down('form').loadRecord(newComment);
        }
    });