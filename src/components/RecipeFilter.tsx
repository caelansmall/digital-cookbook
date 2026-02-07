import { Flex, Radio, Space, theme } from 'antd';
import { SortAscendingOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

type SortOption = 'alphabetical' | 'newest' | 'oldest';

const RecipeSortModal =({
  onSortChange
}: {
  onSortChange: (sort: SortOption) => void
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('alphabetical');
  const { token } = theme.useToken();

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <div style={{ width: 160 }}>
      <Radio.Group
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
        style={{ width: '100%' }}
      >
        <Flex style={{
            padding: "16px 16px",
            cursor: "pointer",
            border: `1px solid ${token.colorBorderSecondary}`,
            background: token.colorBgContainer,

            transition: "background 0.2s, border-color 0.2s",
          }}
        >
          <Radio value="alphabetical" style={{ margin: 0, width: '100%' }}>
            <Space size={6}>
              <SortAscendingOutlined />
              <span>Alphabetical</span>
            </Space>
          </Radio>
        </Flex>
        <Flex style={{
            padding: "16px 16px",
            cursor: "pointer",
            border: `1px solid ${token.colorBorderSecondary}`,
            background: token.colorBgContainer,

            transition: "background 0.2s, border-color 0.2s",
          }}
        >
          <Radio value="newest" style={{ margin: 0, width: '100%' }}>
            <Space size={6}>
              <ClockCircleOutlined />
              <span>Newest</span>
            </Space>
          </Radio>
        </Flex>
        <Flex style={{
            padding: "16px 16px",
            cursor: "pointer",
            border: `1px solid ${token.colorBorderSecondary}`,
            background: token.colorBgContainer,

            transition: "background 0.2s, border-color 0.2s",
          }}
        >
          <Radio value="oldest" style={{ margin: 0, width: '100%' }}>
            <Space size={6}>
              <ClockCircleOutlined />
              <span>Oldest</span>
            </Space>
          </Radio>
        </Flex>
      </Radio.Group>
    </div>
  )
};

export default RecipeSortModal;