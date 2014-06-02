Ext.define('VM.view.applicant.ApplicantDopInfo', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.ApplicantDopInfo',
    region: 'center',
    border: false,
    layout: 'fit',
    plain: true,
    padding: '0 0 0 5',
    items: [
    { title: Strings.Skills,
        layout: 'fit',
        id: 'SkillsTab',
        items: [
          {
              xtype: 'AppReqsList',
              border: true
          }]
    }, {
        title: 'Резюме',
        layout: 'fit',
        items: [
           {
               xtype: 'resumeList',
               border: true
           }]
       }, {
           title: 'Вакансии',
           layout: 'fit',
           items: [{
               xtype: 'applicantConsiderationsList',
               border: true
           }]

    }]
});
