Ext.define
('VM.model.TechListInStack',
  {
    extend: 'Ext.data.Model',
    idProperty: 'TechnologyID',
    fields: ['TechnologyID', 'TechnologyStackID', 'Name']
    //TechnologyStackID �������� ���� ��� ����,
    //����� � ������� ������ ����������� ����������� ���������� � ������ ����
  }
);
