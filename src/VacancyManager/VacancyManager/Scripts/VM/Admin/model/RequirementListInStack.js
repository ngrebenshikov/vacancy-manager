Ext.define
('VM.model.RequirementListInStack',
  {
    extend: 'Ext.data.Model',
    idProperty: 'RequirementID',
    fields: ['RequirementID', 'RequirementStackID', 'Name']
    //RequirementnologyStackID �������� ���� ��� ����,
    //����� � ������� ������ ����������� ����������� ���������� � ������ ����
  }
);
