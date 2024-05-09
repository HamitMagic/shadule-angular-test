export interface ITag {
  class: 'productivity' | 'education' | 'health' | 'urgent';
  text: 'Продуктивность' | 'Образование' | 'Здоровье' | 'Срочно';
  isActive?: boolean;
}