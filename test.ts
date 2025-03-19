import { getLangOpts, getRepositories } from '@/app/[locale]/repos/services';
import { getRepository } from '@/app/[locale]/repo/services';
import { def } from '@/app/[locale]/repos/consts';
import { expectValues } from '@/consts/tests';

test('하나면 하나지 둘이 아니야', () => {
  expect(1).toBe(1);
});

test('언어 목록 조회하기', async () => {
  const { data } = await getLangOpts(def.username);
  expect(data).toEqual(expectValues.langs);
});

test(`레포지토리 목록 ${def.perPage}건씩 조회하기`, async () => {
  const { data } = await getRepositories(def.username, 1, def.perPage);
  expect(data).toHaveLength(def.perPage);
});

test('레포지토리 상세 조회하기', async () => {
  const { data } = await getRepository(def.username, 'recoble-landing');
  expect(data).toEqual(expectValues.repo);
});
