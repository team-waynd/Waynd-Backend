import { Festival } from 'src/modules/festival/festival.entity';
import { regions } from './region.info';
import { v4 as uuidv4 } from 'uuid';

const findRegion = (regionKeyword: string) =>
  regions.find((r) => r.name.includes(regionKeyword));

// 지금은 적은 수의 데이터만 임시로 넣어뒀지만, 추후에 자료를 참고하여 모든 축제 데이터 추가.

export const festivals: Festival[] = [
  {
    id: uuidv4(),
    name: '삼람성, 평화로 물들다(강화도 별별야행)',
    region: findRegion('인천광역시')!,
    theme: '수변형',
    start_date: new Date('1970-01-01'),
    end_date: new Date('1970-01-01'),
    thumbnail: '',
    description:
      '강화군에서 열리는 삼람성, 평화로 물들다(강화도 별별야행)입니다.',
  },
  {
    id: uuidv4(),
    name: '봉산 딸기축제',
    region: findRegion('담양군')!,
    theme: '기타',
    start_date: new Date('1970-01-01'),
    end_date: new Date('1970-01-01'),
    thumbnail: '',
    description: '담양군에서 열리는 봉산 딸기축제입니다.',
  },
  {
    id: uuidv4(),
    name: '2025 묵호 도째비 페스타',
    region: findRegion('동해시')!,
    theme: '수변형',
    start_date: new Date('1970-01-01'),
    end_date: new Date('1970-01-01'),
    thumbnail: '',
    description: '동해시에서 열리는 2025 묵호 도째비 페스타입니다.',
  },
  {
    id: uuidv4(),
    name: '제39회 별망성예술제',
    region: findRegion('안산시')!,
    theme: '녹지형',
    start_date: new Date('1970-01-01'),
    end_date: new Date('1970-01-01'),
    thumbnail: '',
    description: '안산시에서 열리는 제39회 별망성예술제입니다.',
  },
  {
    id: uuidv4(),
    name: '제4회 광주 버스킹월드컵',
    region: findRegion('광주광역시')!,
    theme: '녹지형',
    start_date: new Date('1970-01-01'),
    end_date: new Date('1970-01-01'),
    thumbnail: '',
    description: '동구에서 열리는 제4회 광주 버스킹월드컵입니다.',
  },
  {
    id: uuidv4(),
    name: '신전마을 도자기 전통가마축제',
    region: findRegion('임실군')!,
    theme: '기타',
    start_date: new Date('1970-01-01'),
    end_date: new Date('1970-01-01'),
    thumbnail: '',
    description: '임실군에서 열리는 신전마을 도자기 전통가마축제입니다.',
  },
];
