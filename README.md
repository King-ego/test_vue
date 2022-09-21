# Project Bitcoin

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Tecnologia utilizadas

```
axios
moment
```

### Tempo de update de dados

```
A aplicação atualiza a cada 2s sem a necessecidade re realizar reload no pagina
```

## Filtros

A aplicação possue duas forma de filtrar

### Por data:

```
Utilizando o input de data é possivel pesquisar uma data especifica para saber o preço do bitcoin
```

obs:

```
Caso o input tenha um valor inválido ou seja fornecida uma data maior que a atual, o submit do input será bloqueado e um alert será exibido
```

### Por Moeda

```
Na parte inferior esquerdo existe um select responsário por filtrar por algumas moedas como o real e o ethereum
```

### Durante o request da Api

```
Enquanto a api é consultada, uma modal é aberta simbolizando o loading da aplicação, em caso de de sucesso ou falha, o loading será encerrado.
```
