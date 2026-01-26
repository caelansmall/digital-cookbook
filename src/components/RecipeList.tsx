import { Empty, Flex, Typography, theme } from 'antd';
import type { Recipe } from '../types/recipe.model';

const { Title } = Typography;

// const recipes: Recipe[] = [
//   {
//     id: 1,
//     title: 'Pasta',
//     description: 'Pasta dish',
//     ingredients: [ { name: 'noodles', quantity: '1lb'}, { name: 'sauce', quantity: '6oz' }],
//     instructions: [ { name: 'cook the noodles' }, { name: 'heat the sauce' }, { name: 'combine the noodles with the sauce' }],
//     createdBy: 2
//   },
//   {
//     id: 2,
//     title: 'Bagel with cheems creams',
//     description: 'yummy breakfast',
//     ingredients: [ { name: 'bagel', quantity: '1 bagel'}, { name: 'cheems creams', quantity: '0.5lb' }],
//     instructions: [ { name: 'cut da bagel in half' }, { name: 'toast da bagel' }, { name: 'apply da shmear' }],
//     createdBy: 2
//   }
// ]

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
  // const [ themeConfig, token ] = useToken();

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

      {/* {description && (
        <Text type="secondary" ellipsis>
          {description}
        </Text>
      )} */}

      {/* future-proof: tags, time, difficulty */}
      {/* <Flex gap={4}>
        <Tag>Easy</Tag>
        <Tag>30 min</Tag>
      </Flex> */}
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
        height: '100%',
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