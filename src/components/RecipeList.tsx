import { Button, Card, Empty, Flex, Typography, theme } from 'antd';
import type { Recipe } from '../types/recipe.model';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface RecipeRowProps {
  title: string;
  selected?: boolean;
  onClick: () => void;
}

interface RecipeListProps {
  recipeList: Recipe[];
  selectedRecipeId: number | null;
  onSelect: (id: number) => void;
}

export const RecipeRow = ({
    title,
    selected,
    onClick,
}: RecipeRowProps) => {
  const { token } = theme.useToken();

  return (
    <Flex
      vertical
      gap={4}
      onClick={onClick}
      style={{
        padding: "16px 16px",
        cursor: "pointer",
        borderRadius: 6,
        border: `1px solid ${token.colorBorderSecondary}`,
        background: selected ? token.colorPrimaryBg : token.colorBgContainer,

        transition: "background 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = token.colorPrimaryBorder;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = selected
          ? token.colorPrimaryBorder
          : token.colorBorderSecondary;
      }}
    >
      <Title level={5} style={{ margin: 0 }}>
        {title}
      </Title>

    </Flex>
  );
};

export const RecipeList = ({
  recipeList,
  selectedRecipeId,
  onSelect
}: RecipeListProps) => {

  if (recipeList.length == 0) {
    return <Empty style={{ paddingTop: '30px' }} description="No recipes found!" />
  }

  return (
    <Flex
      vertical
      style={{
        height: '80%',
        overflowY: 'auto',
        padding: 8,
      }}
    >
      {recipeList.map((r) => (
        <RecipeRow
          key={r.id}
          title={r.title}
          selected={r.id === selectedRecipeId}
          onClick={() => {
            if(r.id !== undefined) {
              onSelect(r.id);
            }
          }}
        />
      ))}
    </Flex>
  )
}

export default RecipeList;
