Ext.define('TechStack.model.TechListInStack', {
  extend: 'Ext.data.Model',
  idProperty: 'TechnologyID',
  fields: ['TechnologyID', 'TechnologyStackID', 'Name']
  //TechnologyStackID �������� ���� ��� ����,
  //����� � ������� ������ ����������� ����������� ���������� � ������ ����
});
