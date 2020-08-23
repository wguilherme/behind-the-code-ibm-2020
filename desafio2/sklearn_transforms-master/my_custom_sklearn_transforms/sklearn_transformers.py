# FUNÇÃO DATAFRAME TRANSFORM V2
from sklearn.base import BaseEstimator, TransformerMixin
class DF_transform(BaseEstimator,TransformerMixin):
    def fit(self,X,y=None):
        return self

    def transform(self,X):
        data = X.copy()
        data.drop(labels=['NOME','INGLES','MATRICULA','H_AULA_PRES','TAREFAS_ONLINE'],axis=1,inplace=True)
        data.fillna(value=0,inplace=True)
        data['MEDIA'] = (data['NOTA_DE']+data['NOTA_EM']+data['NOTA_MF']+data['NOTA_GO'])/4
        return data[['REPROVACOES_DE', 'REPROVACOES_EM', 'REPROVACOES_MF', 'REPROVACOES_GO', 'NOTA_DE', 'NOTA_EM', 'NOTA_MF', 'NOTA_GO', 'MEDIA', 'FALTAS']]
    
    
