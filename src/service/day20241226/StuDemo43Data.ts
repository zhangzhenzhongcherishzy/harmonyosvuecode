import { type IDemo5List } from '../types/StuDemo43Types'

export function getList() {
  return new Promise<IDemo5List[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: '【焦】真没花多少，',
          descript: '就2500-暗影养成日记第一天',
          user: 'a',
        },
        {
          id: '2',
          title: '下雨，为何很累很乏很焦虑？',
          descript: '下雨，为何很累很乏很焦虑？',
          user: 'b',
        },
        {
          id: '3',
          title: '【FF14】攻略 100级主线最终讨伐战',
          descript: '',
          user: 'c',
        },
        {
          id: '4',
          title: '“伦纳可得了吧-伦纳德”',
          descript: '“伦纳可得了吧-伦纳德”“伦纳可得了吧-伦纳德”',
          user: 'd',
        },
      ])
    }, 500)
  })
}
