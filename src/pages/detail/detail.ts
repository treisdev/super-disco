import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

import * as d3 from 'd3';

const cutoffAlta = 0.5;
const cutoffMedia = 0.1;

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  proposicao: any = {};
  proposicaoQuery: any = {};

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {
    this.proposicaoQuery = navParams.get('proposicao');
  }

  ionViewDidLoad() {
    this.api
      .searchProposicao(this.proposicaoQuery)
      .map(res => res.json())
      .subscribe(resultadoBusca => {
        const { dados } = resultadoBusca;
        if (dados.length == 1) {
          this.api
            .getProposicao(dados[0])
            .map(res => res.json())
            .subscribe(resp => {
              this.proposicao = resp.dados;
              this.proposicao.keywords = this.proposicao.keywords.split(',');
            });
        }
      });
    this.initSvg();
  }

  initSvg() {
    // Chance de aprovação - Array
    var prob = [this.proposicaoQuery.chance];

    // Define as margens, altura e largura
    var margin = { top: 0, right: 15, bottom: 20, left: 15 };
    var paddingarea = 16 + 16;
    var width = this.platform.width() - paddingarea - margin.left - margin.right;
    var height = 80 - margin.top - margin.bottom;

    // Cria o svg
    var svg = d3
      .select('#aprovometro')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Adiciona um elemento "defs"aao svg (defs receberá o gradiente)
    var defs = svg.append('defs');

    // Adiciona o gradiente ao defs
    var linearGradient = defs.append('linearGradient').attr('id', 'linear-gradient');

    // Cores do gradiente
    linearGradient
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#e74c3c' },
        { offset: '10%', color: '#f39c12' },
        { offset: '50%', color: '#f1c40f' },
        { offset: '100%', color: '#27ae60' }
      ])
      .enter()
      .append('stop')
      .attr('offset', function(d) {
        return d.offset;
      })
      .attr('stop-color', function(d) {
        return d.color;
      });

    // Desenha o retângulo e define a cor de preenchimento
    svg
      .append('rect')
      .attr('width', 'calc(100% - 40px)')
      .attr('height', 20)
      .attr('transform', 'translate(0, 40)')
      .style('fill', 'url(#linear-gradient)');

    // Escala do eixo x
    // É usado para posicionar o triângulo de marcação
    // Domínio de 0 a 1
    var x = d3
      .scaleLinear()
      .range([0, width + margin.left + margin.right - 40])
      .domain([0, 1]);

    // Cria o triângulo
    var arc = d3
      .symbol()
      .type(d3.symbolTriangle)
      .size(function(d) {
        return 20 * 20;
      });

    // Adiciona o triângulo à visualização
    // O posicionamento é dado pela probabilidade
    // Inclui a transição
    svg
      .selectAll('path')
      .remove()
      .exit()
      .data(prob)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', '#488aff')
      .attr('transform', function(d) {
        return 'translate(' + x(0) + ',20) rotate(180)';
      })
      .transition()
      .duration(3000)
      .attr('transform', function(d) {
        return 'translate(' + x(prob[0]) + ',20) rotate(180)';
      });
  }

  public percentToHex(value) {
    const hue = (value * 120).toString(10);
    return ['hsl(', hue, ',80%,40%)'].join('');
  }

  public getColorByBgColor(bgColor) {
    return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2 ? '#333' : '#fff';
  }

  public colorByPercentage(value): any {
    const background = this.percentToHex(value);
    const foreground = this.getColorByBgColor(background);

    return { background, foreground };
  }

  public chanceToText(chance) {
    if (chance > cutoffAlta) return 'Alta';
    if (chance > cutoffMedia) return 'Média';
    return 'Baixa';
  }

  public chanceToClass(chance) {
    if (chance > cutoffAlta) return 'chancealta';
    if (chance > cutoffMedia) return 'chancemedia';
    return 'chancebaixa';
  }
}
