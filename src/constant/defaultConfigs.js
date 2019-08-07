import { paginationConstants } from 'constant/index';

const antTable = {
  locale: {
    emptyText: 'Không có sản phẩm nào',
  },
  bordered: true,
  size: 'medium',
  pagination: {
    pageSizeOptions: paginationConstants.pageSizes,
    showSizeChanger: true,
    size: 'medium',
  },
};

export default {
  antTable,
};
