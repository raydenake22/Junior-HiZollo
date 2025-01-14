import { Command } from "../../classes/Command";
import { Source } from "../../classes/Source";
import { CommandType } from "../../typings/enums";
import { ApplicationCommandOptionType } from "discord.js";
import { cancelTimer } from "../Timer";

export default class CountdownClear extends Command<[Number]> {
  constructor() {
    super({
      type: CommandType.Utility,
      parent: 'timer',
      name: 'clear',
      description: '清理已啟動的計時器',
      extraDescription: '輸入計時器編號以清除指定的計時器，預設清除全部',
      options: [{
        type: ApplicationCommandOptionType.Integer,
        name: '編號',
        description: '計時器的編號',
        required: false
      }]
    });
  }

  public async execute(source: Source, [id]: [Number]): Promise<void> {
    await source.defer();
    await source.update(cancelTimer(source.user, id))
  }
}