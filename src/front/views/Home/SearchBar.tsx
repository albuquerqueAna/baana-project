import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const theme = useTheme();
  // const isDark = theme.palette.mode === 'dark'; // Unused in original but kept for reference if needed

  return (
    <Box sx={{ maxWidth: 448, mx: 'auto' }}>
      <Input
        placeholder="Busque por espécie, família ou região..."
        prefix={
          <SearchOutlined 
            style={{ 
              color: theme.palette.text.secondary, 
            }} 
          />
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="large"
        allowClear
        style={{
          borderRadius: '9999px',
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.background.lighter,
          color: theme.palette.text.primary,
        }}
      />
    </Box>
  );
};
